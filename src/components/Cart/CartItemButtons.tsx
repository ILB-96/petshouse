"use client";
import React, { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { deleteCartItem, setQuantity } from "@/actions/cart-item";
import { Input } from "../ui/input";

const CartItemButtons = ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) => {
  const [loading, setLoading] = useState(false);

  const setCount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const count = (e.target as HTMLFormElement).count.value;
    if (count === quantity.toString()) return;
    setLoading(true);
    await setQuantity(itemId, count);
    window.location.reload();
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
    await deleteCartItem(itemId);
    window.location.reload();
  };

  return (
    <div className="w-full md:w-1/4 flex flex-col items-center md:items-end mt-4 md:mt-0 space-y-3">
      <form className="flex flex-row-reverse" onSubmit={setCount}>
        <Input
          type="number"
          defaultValue={quantity}
          id="count"
          className="w-[6ch] bg-transparent border-none text-lg font-medium"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-2 py-1 bg-yellow-200 rounded-md text-gray-600 hover:bg-gray-100"
        >
          Update
        </Button>
      </form>
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
