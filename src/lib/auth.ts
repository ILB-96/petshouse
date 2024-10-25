import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/database";
import { Role, User } from "@/models/User";
import bcrypt from "bcryptjs";
import { getUserFromDatabase } from "./user";
import { Cart } from "@/models/Cart";
import { sign } from "crypto";
import mongoose from "mongoose";

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
        session.user.image = userFromDB.image;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      await connectDB();

      if (account?.provider === "github") {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: profile?.email });
        let userRecord;

        if (!existingUser) {
          // If user does not exist, create a new user record
          const userRecord = new User({
            email: profile?.email.toLowerCase(),
            name: profile?.name || profile?.login,
            image: profile?.avatar_url || "",
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
            await cart.save();
            await userRecord.save();
          }
        }
        return true;
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
};
