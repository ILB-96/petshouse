import React from "react";
import CategoriesFilter from "./CategoriesFilter";
import CompaniesFilter from "./CompaniesFilter";
import ClearAllFiltersButton from "./ClearAllFiltersButton";
import { Icons } from "../icons";
import { Button } from "../ui/button";
const FilterSidebar = ({
  categories,
  companies,
  filterState,
  setFilterState,
  companyState,
  setCompanyState,
  onClearFilters,
  updateURL,
  onClose,
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-header">
        <h3>Filters</h3>
        <Button onClick={onClose} className="close-sidebar-btn">
          <Icons.exit />
        </Button>
      </div>
      <ClearAllFiltersButton onClick={onClearFilters} />
      <CategoriesFilter
        categories={categories}
        filterState={filterState}
        setFilterState={setFilterState}
        updateURL={updateURL}
      />
      <CompaniesFilter
        companies={companies}
        companyState={companyState}
        setCompanyState={setCompanyState}
        updateURL={updateURL}
      />
    </aside>
  );
};

export default FilterSidebar;
