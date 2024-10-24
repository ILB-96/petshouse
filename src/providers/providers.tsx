"use client";
import { useMounted } from "@/hooks/use-mounted";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const isMounted = useMounted();
  if (!isMounted) {
    return null;
  }

  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
