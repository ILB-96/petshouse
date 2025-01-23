"use client";
import { useMounted } from "@/hooks/use-mounted";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { ReactNode } from "react";
import { CartProvider } from "./CartContext";

const Providers = ({ children }: { children: ReactNode }) => {
  const isMounted = useMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};

export default Providers;
