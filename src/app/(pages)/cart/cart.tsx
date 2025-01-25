"use client";
import CartList from "@/components/Cart/CartList";
import CartSummaryCard from "@/components/Cart/CartSummaryCard";
import Loading from "@/components/Loading";
import { useCart } from "@/providers/CartContext";
import { SectionContainer } from "@/styles/style";
import { PopulatedCartItem } from "@/types";
import React from "react";

const Cart = () => {
  const cart = useCart();
  if (cart.isLoading) return <Loading />;

  if (cart.cartItems.length === 0) {
    return (
      <SectionContainer>
        <h1>Your cart is empty</h1>
      </SectionContainer>
    );
  }
  return (
    <>
      <SectionContainer>
        <CartList cart={cart} />
      </SectionContainer>
      <SectionContainer>
        <CartSummaryCard cartItems={cart.cartItems as PopulatedCartItem[]} />
      </SectionContainer>
    </>
  );
};

export default Cart;
