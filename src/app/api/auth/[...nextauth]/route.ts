import { syncCart } from "@/actions/cart";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { getUserFromDatabase } from "@/actions/user";
import { User, Cart } from "@/models";
import NextAuth, {
  Account,
  AuthOptions,
  Profile,
  User as NextAuthUser,
} from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AdapterUser } from "next-auth/adapters";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { AuthSession } from "@/types";

interface SessionCallbackParams {
  session: AuthSession;
  token: JWT;
  user: AdapterUser;
  newSession: unknown;
  trigger: "update";
}

interface RedirectCallbackParams {
  baseUrl: string;
}

interface SignInCallbackParams {
  user: AdapterUser | NextAuthUser;
  account: Account | null;
  profile?: Profile & { avatar_url?: string; picture?: string };
  email?: { verificationRequest?: boolean | undefined } | undefined;
  credentials?: Record<string, unknown>;
}

interface JwtCallbackParams {
  token: JWT;
  account: Account | null;
  user: (AdapterUser & { cart?: string }) | (NextAuthUser & { cart?: string });
  profile?: Profile & { cart?: string };
}

const handler = async (
  req: NextApiRequest & NextRequest,
  res: NextApiResponse & NextResponse
) => {
  const customAuthOptions: AuthOptions = {
    ...authOptions,
    callbacks: {
      async session({ session, token }: SessionCallbackParams) {
        const userFromDB = token.sub
          ? await getUserFromDatabase(token?.email as string)
          : null;
        if (userFromDB) {
          session.user._id = userFromDB._id;
          session.user.role = userFromDB.role;
          session.user.image = userFromDB.image || session.user.image;
          session.accessToken = token.accessToken;
          session.refreshToken = token.refreshToken;
        }
        return session;
      },
      async redirect({ baseUrl }: RedirectCallbackParams) {
        return baseUrl;
      },
      async signIn({ account, profile, credentials }: SignInCallbackParams) {
        await connectDB();
        if (account?.provider !== "credentials") {
          const existingUser = await User.findOne({ email: profile?.email });
          let userRecord;
          if (!existingUser) {
            userRecord = new User({
              email: profile?.email?.toLowerCase() ?? "",
              name: profile?.name || profile?.email,
              image:
                profile?.avatar_url || profile?.image || profile?.picture || "",
              role: "ADMIN",
            });
            const cart = new Cart({ user: userRecord._id });
            await Promise.all([userRecord.save(), cart.save()]);
          } else {
            userRecord = existingUser;
          }
          const cookieStore = cookies();
          const cartData = cookieStore.get("cart")?.value || "[]";
          await syncCart(userRecord._id, JSON.parse(cartData));
          cookieStore.delete("cart");
          return true;
        }
        const user = await User.findOne({
          email: (credentials?.email as string).toLowerCase(),
        });
        if (!user) throw new Error("Wrong Email");
        await syncCart(
          user?._id as string,
          JSON.parse(credentials?.cart as string)
        );
        return true;
      },
      async jwt({ token, account, user, profile }: JwtCallbackParams) {
        const url = new URL(req.url as string);
        const cart = url.searchParams.get("cart"); // Use searchParams for query params
        if (cart) {
          if (profile) profile.cart = cart;
          if (account) account.cart = cart;
          user.cart = cart;
        }
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.expiresAt = account.expires_at;
        }
        if (account && user) {
          return {
            accessToken: account.accessToken,
            accessTokenExpires:
              Date.now() + (account.expires_in as number) * 1000,
            refreshToken: account.refresh_token,
            user,
          };
        }
        if (Date.now() < (token.accessTokenExpires as number)) {
          return token;
        }

        return refreshAccessToken(token);
      },
    },
  };

  return NextAuth(req, res, customAuthOptions);
};

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export { handler as GET, handler as POST };
