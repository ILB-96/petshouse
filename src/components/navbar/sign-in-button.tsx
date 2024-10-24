"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      await signIn("github");
    });
  };

  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending && <Icons.Loader />}
      Sign in
    </Button>
  );
};
