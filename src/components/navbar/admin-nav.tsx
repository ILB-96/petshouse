import { NavContent, NavLink, Paragraph } from "@/styles/style";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const AdminNav = () => {
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
