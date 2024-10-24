"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import Link from "next/link";
export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button asChild disabled={isPending}>
      <Link href="/api/auth/signin">
        {isPending && <Icons.Loader />}
        Sign in
      </Link>
    </Button>
  );
};
