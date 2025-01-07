import Loading from "@/components/Loading";
import { MainContainer } from "@/styles/style";
import React, { Suspense } from "react";
import Cart from "./cart";

const CartPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainContainer>
        <Cart />
      </MainContainer>
    </Suspense>
  );
};

export default CartPage;
