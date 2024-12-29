import { getCategoryTree } from "@/actions/category";
import { findAllCompaniesSlug as findAllCompanies } from "@/actions/company";
import { getFilteredProducts } from "@/actions/product";
import Loading from "@/components/Loading";
import ProductsFilter from "@/components/ProductsFilter/ProductsFilter";
import ProductsList from "@/components/ProductsList/ProductsList";
import SearchComp from "@/components/search/Search";
import Pagination from "@/components/dashboard/pagination/Pagination";
import { SearchParams } from "@/models/types";
import { MainContainer, SectionContainer } from "@/styles/style";
import React, { Suspense } from "react";

interface PageProps {
  searchParams: SearchParams;
}

const CategoryPage: React.FC<PageProps> = async ({ searchParams }) => {
  const rootCategory = searchParams?.category || "";
  const page = searchParams?.page || 1;
  const filters = searchParams?.filters?.split(",") || [];
  const companiesFilter = searchParams?.companies?.split(",") || [];
  const products_per_page = 18;
  const q = searchParams?.q || "";
  const categories = await getCategoryTree(rootCategory);
  const companies = await findAllCompanies();
  const { count, products } = await getFilteredProducts(
    q,
    page,
    categories,
    filters,
    companiesFilter,
    products_per_page
  );
  console.log(categories);
  return (
    <MainContainer>
      <SectionContainer>
        <Suspense fallback={<Loading />}>
          <ProductsFilter categories={categories} companies={companies} />
          <SearchComp placeholder="Search for products by name..." />
          <ProductsList products={products} count={count} />
          <Pagination count={count} items_per_page={products_per_page} />
        </Suspense>
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoryPage;