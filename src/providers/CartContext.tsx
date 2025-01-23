"use client";
import { findCart } from "@/actions/cart";
import { getCartItems } from "@/actions/cart-item";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/lib/cartStorage";
import { ICartItem } from "@/models/CartItem";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartContextType = {
  cartItems: any[]; // Adjust the type as needed
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const session = useSession();
  useEffect(() => {
    const fetchCartData = async () => {
      console.log("SESSION", session);
      if (session.data?.user) {
        const cartFromDb = await findCart(session.data.user._id as string);
        const cartItemsFromDB = await getCartItems(cartFromDb._id as string);
        console.log("CART FROM DB", cartItemsFromDB);
        setCartItems(cartItemsFromDB);
        return;
      }
      const cart = getCartFromLocalStorage();
      console.log("WHAt", cart);
      if (cart) {
        setCartItems(JSON.parse(cart));
      }
    };

    fetchCartData();
  }, [session]);
  console.log("CART ITEMS", cartItems);
  const addToCart = (item: ICartItem) => {
    const existingItem = cartItems.find((i) => i.product === item.product);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      setCartItems([...cartItems]);
      saveCartToLocalStorage([...cartItems]);
      return;
    } else {
      setCartItems((prev) => [...prev, item]);
      saveCartToLocalStorage([...cartItems, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
