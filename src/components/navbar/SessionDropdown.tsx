"use client";
import useAuth from "@/hooks/use-auth";
import React from "react";
import { Icons } from "../icons";
import { NavLink, ProfileImage } from "@/styles/style";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sessionNavItems } from "./config";
import { SignOutButton } from "./SignOutButton";
import { SignInButton } from "./SignInButton";
const SessionDropdown = () => {
  const { user, loading } = useAuth();
  if (loading) return <Icons.loader />;
  if (!user) return <SignInButton />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage
          width={40}
          height={40}
          src={user.image || "/icons/user.svg"}
          alt="User Profile Image"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface z-[1000]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sessionNavItems.map((item) => (
          <DropdownMenuItem key={item.name} className="z-10 pl-0">
            <NavLink href={item.href}>{item.name}</NavLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SessionDropdown;
