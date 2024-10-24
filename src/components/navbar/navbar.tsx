import { getServerSession } from "next-auth";
import React from "react";
import { SignInButton } from "./sign-in-button";
import { authOptions } from "@/lib/auth";

import BigNav from "./big-nav";
import { NavContainer } from "@/styles/style";
import SessionDropdown from "./session-dropdown";
const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <NavContainer>
      <BigNav />
      {session ? <SessionDropdown /> : <SignInButton />}
    </NavContainer>
  );
};

export default Navbar;
