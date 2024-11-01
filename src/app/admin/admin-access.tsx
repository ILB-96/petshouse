"use client";
import useAdmin from "@/hooks/use-admin";
import React from "react";

const AdminAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAdmin();

  return <>{children}</>;
};

export default AdminAccess;
