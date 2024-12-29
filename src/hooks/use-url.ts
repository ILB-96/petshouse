import { useEffect, useState } from "react";

export const useURLState = (searchParams) => {
  const [filterState, setFilterState] = useState(new Set());
  const [companyState, setCompanyState] = useState(new Set());

  useEffect(() => {
    const urlFilters = searchParams.get("filters")?.split(",") || [];
    const urlCompanies = searchParams.get("companies")?.split(",") || [];
    setFilterState(new Set(urlFilters));
    setCompanyState(new Set(urlCompanies));
  }, [searchParams]);

  return { filterState, setFilterState, companyState, setCompanyState };
};
