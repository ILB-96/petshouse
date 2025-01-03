import React from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

const CartButton = () => {
  return (
    <Button variant="ghost" className="mr-2">
      <Icons.cart style={{ width: "25px", height: "25px" }} />
    </Button>
  );
};

export default CartButton;
