import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainFilterProps, updateURLType } from "@/types";
import { ICompany } from "@/models/Company";

interface CompanyChangeParams {
  companySlug: string;
  checked: boolean;
}
type CompaniesFilterProps = MainFilterProps & {
  updateURL: updateURLType;
  companies: ICompany[];
  setCompanyState: React.Dispatch<React.SetStateAction<Set<unknown>>>;
};
const CompaniesFilter = ({
  searchParams,
  pathname,
  replace,
  companies,
  companyState,
  setCompanyState,
  filterState,
  updateURL,
}: CompaniesFilterProps) => {
  const handleCompanyChange = ({
    companySlug,
    checked,
  }: CompanyChangeParams): void => {
    const newCompanyState = new Set(companyState);
    if (checked) {
      newCompanyState.add(companySlug);
    } else {
      newCompanyState.delete(companySlug);
    }
    setCompanyState(newCompanyState);
    const data = {
      searchParams,
      pathname,
      replace,
      filterState,
      companyState: newCompanyState,
    };
    updateURL(data);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-1">Companies</h3>
      <div className="max-h-[calc(50vh-8rem)] overflow-y-auto">
        <ul className="pl-5">
          {companies.map((company) => (
            <li key={company._id as string} className="my-2">
              <Label className="flex items-center gap-1 cursor-pointer">
                <Input
                  type="checkbox"
                  value={company.slug}
                  className="size-4"
                  checked={companyState.has(company.slug)}
                  onChange={(e) =>
                    handleCompanyChange({
                      companySlug: company.slug,
                      checked: e.target.checked,
                    })
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
