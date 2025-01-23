"use server";
import { Cart, CartItem } from "@/models";
import { connectDB } from "@/lib/database";
import { ICartItem } from "@/models/CartItem";

export const syncCart = async (user: string, localCartItems: ICartItem[]) => {
  await connectDB();

  // Find the user's active cart
  let activeCart = await Cart.findOne({ user, status: "ACTIVE" });
  if (!activeCart) {
    // If no active cart exists, create a new cart
    activeCart = new Cart({ user, status: "ACTIVE" });
    await activeCart.save();
  }

  // Map localCartItems to existing cart items in the database
  const dbCartItems = await CartItem.find({ cart: activeCart._id });

  const dbCartItemsMap = new Map(
    dbCartItems.map((item) => [item.product.toString(), item])
  );
  for (const localItem of localCartItems) {
    if (dbCartItemsMap.has(localItem.product)) {
      // Update quantity if item exists
      const existingItem = dbCartItemsMap.get(localItem.product);
      existingItem.quantity = localItem.quantity;
      await existingItem.save();
    } else {
      // Add new item to the cart
      const newItem = new CartItem({
        product: localItem.product,
        cart: activeCart._id,
        quantity: localItem.quantity,
      });
      await newItem.save();
    }
  }
  return activeCart;
};
export const findCart = async (user: string) => {
  await connectDB();
  const cart = await Cart.findOne({ user, status: "ACTIVE" });
  return JSON.parse(JSON.stringify(cart));
};


