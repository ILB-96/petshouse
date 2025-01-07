import React from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { NavLink } from "@/styles/style";

const CartButton = ({ count }: { count: number }) => {
  return (
    <Button variant="ghost" className="mr-2" asChild>
      <NavLink href="/cart">
        <Icons.cart style={{ width: "25px", height: "25px" }} /> ({count})
      </NavLink>
    </Button>
  );
};

export default CartButton;
