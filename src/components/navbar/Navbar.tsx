import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";
import { findMainCategories } from "@/actions/category";
import { NavContainer } from "@/styles/style";
import BigNav from "./BigNav";
import SmallNav from "./SmallNav";
import CartButton from "./CartButton";
import { SignInButton } from "./SignInButton";
import SessionDropdown from "./SessionDropdown";
import AdminNav from "./AdminNav";

const Navbar = async () => {
  try {
    const categories = await findMainCategories();

    return (
      <>
        <AdminNav />
        <NavContainer>
          <BigNav categories={categories} />
          <SmallNav categories={categories} />
          <div className="-col-start-3 max-sm:-col-start-7 max-sm:col-span-2">
            <CartButton />
          </div>
          <div className="col-span-1 max-sm:-col-start-4 max-sm:col-span-2">
            <SessionDropdown />
          </div>
        </NavContainer>
      </>
    );
  } catch (error) {
    return (
      <NavContainer>
        <p>Error loading navbar...</p>
      </NavContainer>
    );
  }
};

export default Navbar;
