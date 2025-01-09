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
import { getCartItemsCount } from "@/actions/cart-item";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const categories = await findMainCategories();
  let cartItemsCount = 0;
  let user = null;
  if (session?.user) {
    const values = await getCartItemsCount(session.user?.email);
    cartItemsCount = values.cartItemsCount;
    user = values.user;
  }
  console.log(user);
  return (
    <>
      {user?.role === Role.ADMIN ? <AdminNav /> : null}
      <NavContainer>
        <BigNav categories={categories} />
        <div className="-col-start-3">
          <CartButton count={cartItemsCount} />
        </div>
        <div className="col-span-1">
          {session ? <SessionDropdown /> : <SignInButton />}
        </div>
      </NavContainer>
    </>
  );
};

export default Navbar;
