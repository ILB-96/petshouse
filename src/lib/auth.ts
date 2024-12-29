import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/database";
import { Role, User } from "@/models/User";
import bcrypt from "bcryptjs";
import { getUserFromDatabase } from "./user";
import { Cart } from "@/models/Cart";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name?: string;
      email?: string;
      image?: string | null;
      cartId?: string;
      role?: Role;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      name: "GitHub",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/drive openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email.toLowerCase(),
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userFromDB = token.sub
        ? await getUserFromDatabase(token?.email)
        : null;
      // Add custom fields like cartId to the session object
      if (userFromDB) {
        session.user._id = userFromDB._id;
        session.user.role = userFromDB.role;
        session.user.image = userFromDB.image || session.user.picture;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresAt = token.expiresAt;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      await connectDB();

      if (account?.provider !== "credentials") {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: profile?.email });
        let userRecord;
        if (!existingUser) {
          // If user does not exist, create a new user record
          userRecord = new User({
            email: profile?.email.toLowerCase(),
            name: profile?.name || profile?.email,
            image:
              profile?.avatar_url || profile?.image || profile?.picture || "",
          });

          // Create a new cart associated with the new user
          const cart = new Cart({ userId: userRecord._id });

          await Promise.all([userRecord.save(), cart.save()]); // Save both user and cart
        } else {
          // If the user exists, retrieve the user record
          userRecord = existingUser;

          // Convert userId to an ObjectId if it's not already one

          // Check if the user has an existing cart; if not, create one
          let cart = await Cart.findOne({ userId: userRecord._id });
          if (!cart) {
            cart = new Cart({ userId: userRecord._id });
            await Promise.all([cart.save(), userRecord.save()]);
          }
        }
        return true;
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      if (typeof token.expiresAt === "number" && Date.now() > token.expiresAt) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token.refreshToken);
      if (refreshedToken) {
        token.accessToken = refreshedToken.accessToken;
        token.expiresAt = refreshedToken.expiresAt;
      } else {
        console.error(
          "Could not refresh access token. User may need to reauthenticate."
        );
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      console.error("Failed to refresh access token", await response.text());
      return null;
    }

    const data = await response.json();

    return {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
