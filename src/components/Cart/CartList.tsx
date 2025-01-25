import CartItemCard from "./CartItemCard";
import React from "react";
import { PopulatedCartItem } from "@/types";
import { CartContextType } from "@/providers/CartContext";

const CartList: React.FC<{ cart: CartContextType }> = ({ cart }) => {
  return (
    <div className="p-4">
      {cart.cartItems.map((item) => (
        <CartItemCard
          key={item.product._id as string}
          item={item as PopulatedCartItem}
        />
      ))}
    </div>
  );
};

export default CartList;
