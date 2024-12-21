"use client";
import useAdmin from "@/hooks/use-admin";
import { useMounted } from "@/hooks/use-mounted";
import React from "react";

const AdminAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMounted = useMounted();
  useAdmin();
  if (!isMounted) return null;

  return <>{children}</>;
};

export default AdminAccess;
