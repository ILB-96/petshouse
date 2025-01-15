import { ICartItem } from "@/models/CartItem";

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
export const addItemToLocalStorageCart = (item: ICartItem) => {
  const cart = JSON.parse(getCartFromLocalStorage());
  const existingItem = cart.find((i: ICartItem) => i.product === item.product);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCartToLocalStorage(cart);
};
