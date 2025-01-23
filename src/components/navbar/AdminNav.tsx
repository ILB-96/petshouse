"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const AdminNav = () => {
  const session = useSession();
  if (!session.data?.user) return null;
  return (
    <nav className="pl-24 bg-slate-300 w-screen h-9">
      <Button asChild variant="link" size="sm" className="text-blue-500">
        <Link href="/admin" className="">
          Admin Dashboard
        </Link>
      </Button>
    </nav>
  );
};

export default AdminNav;
