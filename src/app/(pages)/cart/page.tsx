import { findCart } from "@/actions/cart";
import CartList from "@/components/Cart/CartList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const cart = await findCart();
  return <CartList cart={cart.items} />;
};

export default CartPage;
