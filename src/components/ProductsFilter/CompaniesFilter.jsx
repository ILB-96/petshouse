import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CompaniesFilter = ({
  searchParams,
  pathname,
  replace,
  companies,
  companyState,
  setCompanyState,
  filterState,
  updateURL,
}) => {
  const handleCompanyChange = (companySlug, checked) => {
    const newCompanyState = new Set(companyState);
    if (checked) {
      newCompanyState.add(companySlug);
    } else {
      newCompanyState.delete(companySlug);
    }
    setCompanyState(newCompanyState);
    updateURL(searchParams, pathname, replace, filterState, newCompanyState);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-1">Companies</h3>
      <div className="max-h-[calc(50vh-8rem)] overflow-y-auto">
        <ul className="pl-5">
          {companies.map((company) => (
            <li key={company._id} className="my-2">
              <Label className="flex items-center gap-1 cursor-pointer">
                <Input
                  type="checkbox"
                  value={company.slug}
                  className="size-4"
                  checked={companyState.has(company.slug)}
                  onChange={(e) =>
                    handleCompanyChange(company.slug, e.target.checked)
                  }
                />
                {company.name}
              </Label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompaniesFilter;
