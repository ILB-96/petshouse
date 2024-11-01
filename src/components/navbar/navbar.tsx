import { getServerSession } from "next-auth";
import React from "react";
import { SignInButton } from "./sign-in-button";
import { authOptions } from "@/lib/auth";

import BigNav from "./big-nav";
import { NavContainer } from "@/styles/style";
import SessionDropdown from "./session-dropdown";
import { Role } from "@/models/User";
import AdminNav from "./admin-nav";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user?.role === Role.ADMIN ? <AdminNav /> : null}
      <NavContainer>
        <BigNav />
        {session ? <SessionDropdown /> : <SignInButton />}
      </NavContainer>
    </>
  );
};

export default Navbar;
