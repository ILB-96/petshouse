"use client";
import React, { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { deleteCartItem, setQuantity } from "@/actions/cart-item";
import { Input } from "../ui/input";
import { PopulatedCartItem } from "@/types";
import { CartContextType, useCart } from "@/providers/CartContext";

const CartItemButtons = ({ item }: { item: PopulatedCartItem }) => {
  const [loading, setLoading] = useState(false);
  const { addToCart, removeFromCart } = useCart();

  const setCount = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    const count = parseInt(e.target.value);
    if (count === item.quantity) return;
    await setQuantity(item._id as string, count);
    addToCart({ ...item, quantity: count } as PopulatedCartItem);
    setLoading(false);
  };

  const handleRemoveItem = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmed) {
      removeItem();
    }
  };

  const removeItem = async () => {
    setLoading(true);
    removeFromCart(item.product._id as string);
    await deleteCartItem(item._id as string);
    setLoading(false);
  };

  return (
    <div className="w-full md:w-1/4 flex flex-col items-center md:items-end mt-4 md:mt-0 space-y-3">
      <Input
        type="number"
        defaultValue={item.quantity}
        id="count"
        className="w-[6ch] bg-transparent border-none text-lg font-medium"
        onChange={(e) => setCount(e)}
      />
      <Button
        onClick={handleRemoveItem}
        className="px-2 border border-red-500 rounded-md text-red-500 hover:bg-red-100 flex items-center"
        disabled={loading}
      >
        <Icons.trash /> Trash
      </Button>
    </div>
  );
};

export default CartItemButtons;
