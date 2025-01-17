"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { updateURL } from "@/lib/filter";
import CompaniesFilter from "./CompaniesFilter";
import CategoriesFilter from "./CategoriesFilter";
import FilterToggleButton from "./FilterToggleButton";
import ClearAllFiltersButton from "./ClearAllFiltersButton";
import { useURLState } from "@/hooks/use-url";
import { CategoryTree } from "@/actions/category";
import { ICompany } from "@/models/Company";

interface ProductsFilterProps {
  categories: CategoryTree;
  companies: ICompany[];
}

const ProductsFilter = ({ categories, companies }: ProductsFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { filterState, setFilterState, companyState, setCompanyState } =
    useURLState(searchParams);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const clearAllFiltersAndCompanies = () => {
    setFilterState(new Set());
    setCompanyState(new Set());
    const data = {
      searchParams,
      pathname,
      replace,
      companyState: new Set(),
      filterState: new Set(),
    };
    updateURL(data);
  };

  return (
    <>
      <FilterToggleButton
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        filterState={filterState}
        companyState={companyState}
      />

      <div
        className={`fixed top-10 left-0 h-full bg-white border-r w-72 p-6 z-40 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sticky top-44 flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {`Filter ${categories.name} Products`}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <Icons.exit className="h-4 w-4" />
          </Button>
        </div>

        {categories.children?.length > 0 && (
          <CategoriesFilter
            searchParams={searchParams}
            pathname={pathname}
            replace={replace}
            categories={categories}
            companyState={companyState}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )}

        {companies?.length > 0 && (
          <CompaniesFilter
            companies={companies}
            companyState={companyState}
            setCompanyState={setCompanyState}
            pathname={pathname}
            searchParams={searchParams}
            replace={replace}
            filterState={filterState}
            updateURL={updateURL}
          />
        )}
        <ClearAllFiltersButton onClick={clearAllFiltersAndCompanies} />
      </div>
    </>
  );
};

export default ProductsFilter;
