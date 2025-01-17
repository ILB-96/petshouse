import CartItemCard from "./CartItemCard";
import React from "react";
import { PopulatedCartItem } from "@/types";

const CartList: React.FC<{ cartItems: PopulatedCartItem[] }> = ({
  cartItems,
}) => {
  return (
    <div className="p-4">
      {cartItems.map((item: PopulatedCartItem) => (
        <CartItemCard key={item._id as string} item={item} />
      ))}
    </div>
  );
};

export default CartList;
