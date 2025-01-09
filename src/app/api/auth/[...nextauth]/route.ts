import { syncCart } from "@/actions/cart";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { getUserFromDatabase } from "@/lib/user";
import { User, Cart } from "@/models";
import NextAuth from "next-auth";
import { cookies } from "next/headers";

const handler = async (req, res) => {
  const customAuthOptions = {
    ...authOptions,
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
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async signIn({ user, account, profile, credentials }) {
        await connectDB();
        const existingUser = await User.findOne({ email: profile?.email });
        if (account?.provider !== "credentials") {
          // Check if the user already exists in the database
          let userRecord;
          if (!existingUser) {
            // If user does not exist, create a new user record
            userRecord = new User({
              email: profile?.email.toLowerCase(),
              name: profile?.name || profile?.email,
              image:
                profile?.avatar_url || profile?.image || profile?.picture || "",
              role: "ADMIN",
            });

            // Create a new cart associated with the new user
            const cart = new Cart({ user: userRecord._id });

            await Promise.all([userRecord.save(), cart.save()]); // Save both user and cart
          } else {
            // If the user exists, retrieve the user record
            userRecord = existingUser;
          }
          const cookieStore = cookies();
          const cartData = cookieStore.get("cart")?.value || "[]";
          await syncCart(userRecord._id, JSON.parse(cartData));
          cookieStore.delete("cart");
          return true;
        }
        await syncCart(existingUser._id, JSON.parse(credentials?.cart));
        return true;
      },
      async jwt({ token, account, user, profile, session }) {
        const cart = req.nextUrl.searchParams.get("cart");
        if (cart) {
          profile.cart = cart;
          account.cart = cart;
          user.cart = cart;
        }
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.expiresAt = account.expires_at;
        }
        return token;
      },
    },
  };

  return NextAuth(req, res, customAuthOptions);
};

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
