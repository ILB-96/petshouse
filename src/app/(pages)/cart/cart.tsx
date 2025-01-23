"use client";
import CartList from "@/components/Cart/CartList";
import CartSummaryCard from "@/components/Cart/CartSummaryCard";
import { authOptions } from "@/lib/auth";
import { useCart } from "@/providers/CartContext";
import { SectionContainer } from "@/styles/style";
import { getServerSession } from "next-auth";
import React from "react";

const Cart = () => {
  const item = useCart();
  if (item.cartItems.length === 0) {
    return null;
  }
  return (
    <>
      <SectionContainer>
        <CartList cartItems={item.cartItems} />
      </SectionContainer>
      <SectionContainer>
        <CartSummaryCard cartItems={item.cartItems} />
      </SectionContainer>
    </>
  );
};

export default Cart;
