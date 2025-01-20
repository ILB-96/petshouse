"use client";
import React, { useRef, useState } from "react";

import { navItems } from "./config";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavProps } from "./BigNav";
import useClickOutside from "@/hooks/use-click-outside";
const SmallNav: React.FC<NavProps> = ({ categories }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside({ ref: menuRef, action: () => setMenuOpen(false) });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const goToCategory = (cate: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", cate);
    params.set("page", "1");
    params.set("sortby", "newest");
    const path = pathname === "/shop" ? pathname : `/shop`;
    replace(`${path}?${params}`);
  };
  return (
    <div
      ref={menuRef}
      className=" relative grid grid-cols-subgrid sm:hidden col-start-2"
    >
      <Button
        variant="ghost"
        className={`z-50 col-span-2 col-start-1 m-0 size-full rounded-lg bg-transparent p-0 transition-transform duration-300 focus:bg-transparent ${
          menuOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={() => setMenuOpen((prevState) => !prevState)}
        aria-expanded={menuOpen}
        aria-controls="sidebar-menu"
        aria-label="Toggle menu"
      >
        {menuOpen ? <Icons.exit /> : <Icons.menu />}
      </Button>
      <div
        id="sidebar-menu"
        className={`from-background to-secondary shadow-muted focus:text-foreground fixed left-0 top-0 z-40 flex h-screen w-1/2 flex-col space-y-4 rounded-r-lg bg-gradient-to-br pt-28 pl-4 font-medium shadow-sm transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        role="menu"
      >
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
    </div>
  );
};
export default SmallNav;
