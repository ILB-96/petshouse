import Loading from "@/components/Loading";
import { SearchParams } from "@/types";
import { MainContainer } from "@/styles/style";
import React, { Suspense } from "react";
import Category from "./category";

interface PageProps {
  searchParams: SearchParams;
}

const CategoryPage: React.FC<PageProps> = async ({ searchParams }) => {
  return (
    <Suspense
      key={searchParams?.filters || searchParams?.category || "shop"}
      fallback={<Loading />}
    >
      <MainContainer>
        <Category searchParams={searchParams} />
      </MainContainer>
    </Suspense>
  );
};

export default CategoryPage;
