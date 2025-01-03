import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/database";
import { Role, User } from "@/models/User";
import bcrypt from "bcryptjs";

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
          cart: "",
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
  session: {
    strategy: "jwt",
  },
};
