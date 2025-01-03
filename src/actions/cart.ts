"use server";

import { Cart } from "@/models/Cart";
import { CartItem } from "@/models/CartItem";
import { connectDB } from "@/lib/database";

export const syncCart = async (user: string, localCartItems: any[]) => {
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
    if (dbCartItemsMap.has(localItem.productId)) {
      // Update quantity if item exists
      const existingItem = dbCartItemsMap.get(localItem.productId);
      existingItem.quantity = localItem.quantity;
      await existingItem.save();
    } else {
      // Add new item to the cart
      const newItem = new CartItem({
        product: localItem.productId,
        cart: activeCart._id,
        quantity: localItem.quantity,
      });
      await newItem.save();
    }
  }
  return activeCart;
};

export const findCart = async (userId: string) => {
  await connectDB();

  if (userId === "") {
    // Fetch local cart from localStorage
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return {
      cart: { userId: "local", status: "ACTIVE" },
      items: localCart, // Local cart doesn't have a schema, so we return raw data
    };
  }

  if (!cart) {
    // If no cart exists, return an empty cart
    return {
      cart: null,
      items: [],
    };
  }

  // Fetch all cart items
  const items = await CartItem.find({ cart: cart._id }).populate("product");

  return {
    cart,
    items,
  };
};
