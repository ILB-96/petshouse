"use client";
import React from "react";
import { navItems } from "./config";
import { usePathname } from "next/navigation";
import { LogoLink, NavContent, NavLink } from "@/styles/style";
import Image from "next/image";

const BigNav = () => {
  const pathname = usePathname();

  return (
    <NavContent>
      <LogoLink href="/">
        <Image src="/logo.png" alt="PetsGouse logo" width={700} height={405} />
      </LogoLink>
      <div className="flex my-auto gap-2 h-fit">
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.name}
              href={item.href}
              className={
                pathname === item.href ? "bg-blue-400 size-fit" : "size-fit"
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </NavContent>
  );
};

export default BigNav;
