"use client";
import { findCartItems } from "@/actions/cart-item";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/lib/cartStorage";
import { ICartItem } from "@/models/CartItem";
import { PopulatedCartItem } from "@/types";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartContextType = {
  cartItems: PopulatedCartItem[]; // Adjust the type as needed
  addToCart: (item: PopulatedCartItem) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<PopulatedCartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session = useSession();

  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true); // Start loading
      try {
        if (session.data?.user) {
          const cartItemsFromDB = await findCartItems(
            session.data.user.email as string
          );
          setCartItems(cartItemsFromDB.items);
        } else {
          const cart = getCartFromLocalStorage();
          if (cart) {
            setCartItems(JSON.parse(cart));
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [session]);

  const addToCart = (item: PopulatedCartItem) => {
    const existingItem = cartItems.find(
      (i) => (i.product._id as string) === item.product._id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
      setCartItems([...cartItems]);
      if (!session.data?.user) saveCartToLocalStorage([...cartItems]);

      return;
    } else {
      setCartItems((prev) => [...prev, item]);
      if (!session.data?.user) saveCartToLocalStorage([...cartItems, item]);
    }
  };

  const removeFromCart = (id: string) => {
    if (!session.data?.user)
      saveCartToLocalStorage(
        cartItems.filter((item) => item.product._id !== id)
      );
    setCartItems((prev) => prev.filter((item) => item.product._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartCount: cartItems.length,
        isLoading,
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
