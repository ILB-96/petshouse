import { getServerSession } from "next-auth";
import React from "react";
import { SignInButton } from "./sign-in-button";
import { authOptions } from "@/lib/auth";

import BigNav from "./big-nav";
import { NavContainer } from "@/styles/style";
import SessionDropdown from "./session-dropdown";
import { Role } from "@/models/User";
import AdminNav from "./admin-nav";
import { findMainCategories } from "@/actions/category";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const categories = await findMainCategories();
  return (
    <>
      {session?.user?.role === Role.ADMIN ? <AdminNav /> : null}
      <NavContainer>
        <BigNav categories={categories} />
        {session ? <SessionDropdown /> : <SignInButton />}
      </NavContainer>
    </>
  );
};

export default Navbar;
