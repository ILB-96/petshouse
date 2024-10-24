"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { NavLink } from "@/styles/style";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <Button
      variant="link"
      className="pl-0"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending && <Icons.Loader />}
      Sign out
    </Button>
  );
};
