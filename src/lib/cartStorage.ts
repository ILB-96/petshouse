export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? cart : "[]";
};

export const saveCartToLocalStorage = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearLocalStorageCart = () => {
  localStorage.removeItem("cart");
};
export const addItemToLocalStorageCart = (item: any) => {
  const cart = JSON.parse(getCartFromLocalStorage());
  const existingItem = cart.find((i: any) => i.product === item.product);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCartToLocalStorage(cart);
};
