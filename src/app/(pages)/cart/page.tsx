import Loading from "@/components/Loading";
import { MainContainer } from "@/styles/style";
import React, { Suspense } from "react";
import Cart from "./cart";

const CartPage = async () => {
  return (
    <MainContainer>
      <Suspense fallback={<Loading />}>
        <Cart />
      </Suspense>
    </MainContainer>
  );
};

export default CartPage;
