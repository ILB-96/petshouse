"use server";
import { connectDB } from "@/lib/database";
import Cart from "@/models/Cart";
import CartItem from "@/models/CartItem";
export const createCartItem = async (
  product: string,
  user: string,
  quantity: number
) => {
  await connectDB();
  const cart = await Cart.findOne({ user: user, status: "ACTIVE" });
  const newItem = new CartItem({
    product: product,
    cart: cart._id,
    quantity: quantity,
  });
  await newItem.save();
  return { ...newItem, _id: newItem._id.toString() };
};
