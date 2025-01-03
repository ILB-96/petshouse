"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductsSortBy = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icons.sortby /> Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={searchParams.get("sortby") || "newest"}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("sortby", value);
            replace(`${pathname}?${params}`);
          }}
        >
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-low-high">
            Price: Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-high-low">
            Price: High to Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductsSortBy;
