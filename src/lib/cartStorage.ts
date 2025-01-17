import { ICartItem } from "@/models/CartItem";
import { Types } from "mongoose";

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? cart : "[]";
};

export const saveCartToLocalStorage = (cart: ICartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearLocalStorageCart = () => {
  localStorage.removeItem("cart");
};
export const addItemToLocalStorageCart = (item: {
  product: string | Types.ObjectId;
  quantity: number;
}) => {
  const cart = JSON.parse(getCartFromLocalStorage());
  const existingItem = cart.find((i: ICartItem) => i.product === item.product);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCartToLocalStorage(cart);
};
