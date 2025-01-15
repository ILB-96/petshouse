import { ICartItem } from "@/models/CartItem";
import CartItemCard from "./CartItemCard";
import React from "react";

const CartList: React.FC<{ cartItems: ICartItem[] }> = ({ cartItems }) => {
  return (
    <div className="p-4">
      {cartItems.map((item: ICartItem) => (
        <CartItemCard key={item._id as string} item={item} />
      ))}
    </div>
  );
};

export default CartList;
