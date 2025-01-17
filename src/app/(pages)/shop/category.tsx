import { getCategoryTree, CategoryTree } from "@/actions/category";
import { findAllCompaniesSlug as findAllCompanies } from "@/actions/company";
import { getFilteredProducts } from "@/actions/product";
import ProductsFilter from "@/components/ProductsFilter/ProductsFilter";
import ProductsList from "@/components/ProductsList/ProductsList";
import SearchComp from "@/components/search/Search";
import Pagination from "@/components/dashboard/pagination/Pagination";
import { SearchParams } from "@/types";
import { SectionContainer, SearchSortContainer } from "@/styles/style";
import React from "react";
import ProductsSortBy from "@/components/ProductsSortBy/ProductsSortBy";
import { ShoppingBag } from "lucide-react";

interface PageProps {
  searchParams: SearchParams;
}

const Category: React.FC<PageProps> = async ({ searchParams }) => {
  const rootCategory = searchParams?.category || "";
  const page = searchParams?.page || 1;
  const sortby = searchParams?.sortby || "newest";
  const filters = searchParams?.filters?.split(",") || [];
  const companiesFilter = searchParams?.companies?.split(",") || [];
  const products_per_page = 18;
  const q = searchParams?.q || "";
  if (!rootCategory) {
    return null;
  }
  const categories: CategoryTree = await getCategoryTree(rootCategory);
  const companies = await findAllCompanies();
  const { count, products } = await getFilteredProducts(
    q,
    page,
    sortby,
    categories,
    filters,
    companiesFilter,
    products_per_page
  );
  return (
    <SectionContainer className="mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">
            {categories.name ? categories.name : "Products"}
          </h1>
        </div>
        <div className="text-sm text-gray-500">{count} products found</div>
      </div>
      <SearchSortContainer>
        <ProductsFilter categories={categories} companies={companies} />
        <SearchComp placeholder="Search for products by name..." />
        <ProductsSortBy />
      </SearchSortContainer>
      <ProductsList products={products} />
      <Pagination count={count} items_per_page={products_per_page} />
    </SectionContainer>
  );
};

export default Category;
