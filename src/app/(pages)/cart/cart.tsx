import { findCartItems } from "@/actions/cart-item";
import CartList from "@/components/Cart/CartList";
import CartSummaryCard from "@/components/Cart/CartSummaryCard";
import { authOptions } from "@/lib/auth";
import { SectionContainer } from "@/styles/style";
import { getServerSession } from "next-auth";
import React from "react";

const Cart = async () => {
  const session = await getServerSession(authOptions);
  const { items } = await findCartItems(session?.user?.email || "");
  return (
    <>
      <SectionContainer>
        <CartList cartItems={items} />
      </SectionContainer>
      <SectionContainer>
        <CartSummaryCard cartItems={items} />
      </SectionContainer>
    </>
  );
};

export default Cart;
