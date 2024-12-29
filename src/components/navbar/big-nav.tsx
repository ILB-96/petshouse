"use client";
import React from "react";
import { navItems } from "./config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogoLink, NavContent, NavLink } from "@/styles/style";
import Image from "next/image";
import { ICategory } from "@/models/Category";
import { Button } from "../ui/button";

interface BigNavProps {
  categories: ICategory[];
}

const BigNav: React.FC<BigNavProps> = ({ categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const goToCategory = (cate) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", cate);
    params.set("page", "1");
    const path = pathname === "/shop" ? pathname : `shop`;
    replace(`${path}?${params}`);
  };

  return (
    <NavContent>
      <LogoLink href="/">
        <Image src="/logo.png" alt="PetsGouse logo" width={700} height={405} />
      </LogoLink>
      <div className="flex my-auto gap-2 h-fit">
        {navItems.map((item) => {
          return (
            <Button
              key={item.name}
              onClick={() => replace(item.href)}
              variant="ghost"
              className={`size-fit rounded-2xl ${
                pathname === item.href && " bg-blue-400 "
              }
              `}
            >
              {item.name}
            </Button>
          );
        })}
        {categories.map((cate) => (
          <Button
            variant="ghost"
            key={cate.slug}
            onClick={() => {
              goToCategory(cate.slug);
            }}
            className={`rounded-2xl size-fit ${
              searchParams.get("category") === cate.slug && "bg-blue-400"
            }
            `}
          >
            {cate.name}
          </Button>
        ))}
      </div>
    </NavContent>
  );
};

export default BigNav;
