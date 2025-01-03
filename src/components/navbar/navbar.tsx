import { getServerSession } from "next-auth";
import React from "react";
import { SignInButton } from "./SignInButton";
import { authOptions } from "@/lib/auth";

import BigNav from "./BigNav";
import { NavContainer } from "@/styles/style";
import SessionDropdown from "./SessionDropdown";
import { Role } from "@/models/User";
import AdminNav from "./AdminNav";
import { findMainCategories } from "@/actions/category";
import CartButton from "./CartButton";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const categories = await findMainCategories();
  return (
    <>
      {session?.user?.role === Role.ADMIN ? <AdminNav /> : null}
      <NavContainer>
        <BigNav categories={categories} />
        <div className="col-span-2">
          <CartButton />
          {session ? <SessionDropdown /> : <SignInButton />}
        </div>
      </NavContainer>
    </>
  );
};

export default Navbar;
