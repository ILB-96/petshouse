"use client";

import React from "react";
import { NavLink } from "@/styles/style";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
const AddButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface z-[1000]">
        <DropdownMenuLabel>Discount Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <NavLink href="discounts/add/cartDiscount">Cart Discount</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="discounts/add/productDiscount">
            Product Discount
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="discounts/add/categoryDiscount">
            Category Discount
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="discounts/add/companyDiscount">
            Company Discount
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="discounts/add/buyXgetY">Buy X Get Y</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="discounts/add/categoryDiscount">Free Shipping</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddButton;
