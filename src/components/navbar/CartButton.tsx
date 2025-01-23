"use client";
import React from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { NavLink } from "@/styles/style";
import { useCart } from "@/providers/CartContext";

const CartButton = () => {
  const item = useCart();
  return (
    <Button variant="ghost" className="mr-2" asChild>
      <NavLink href="/cart">
        <Icons.cart style={{ width: "25px", height: "25px" }} /> (
        {item.cartCount})
      </NavLink>
    </Button>
  );
};

export default CartButton;
