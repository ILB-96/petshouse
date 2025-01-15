"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const SignInButton = () => {
  return (
    <Button asChild>
      <Link href="/api/auth/signin">Sign in</Link>
    </Button>
  );
};
