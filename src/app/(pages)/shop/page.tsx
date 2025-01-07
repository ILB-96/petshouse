import { getCategoryTree } from "@/actions/category";
import { findAllCompaniesSlug as findAllCompanies } from "@/actions/company";
import { getFilteredProducts } from "@/actions/product";
import Loading from "@/components/Loading";
import ProductsFilter from "@/components/ProductsFilter/ProductsFilter";
import ProductsList from "@/components/ProductsList/ProductsList";
import SearchComp from "@/components/search/Search";
import Pagination from "@/components/dashboard/pagination/Pagination";
import { SearchParams } from "@/models/types";
import {
  MainContainer,
  SectionContainer,
  FilterContainer,
  SearchSortContainer,
} from "@/styles/style";
import React, { Suspense } from "react";
import ProductsSortBy from "@/components/ProductsSortBy/ProductsSortBy";
import Category from "./category";

interface PageProps {
  searchParams: SearchParams;
}

const CategoryPage: React.FC<PageProps> = async ({ searchParams }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainContainer>
        <Category searchParams={searchParams} />
      </MainContainer>
    </Suspense>
  );
};

export default CategoryPage;
