import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleCheckboxChange } from "@/lib/filter";
import { Icons } from "@/components/icons";

const CategoriesFilter = ({
  searchParams,
  pathname,
  replace,
  categories,
  filterState,
  companiesState,
  setFilterState,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategories = (categoriesArray) => {
    return (
      <ul>
        {categoriesArray.map((category) => (
          <li
            key={category._id}
            className={`my-2 ${category.children?.length > 0 ? "" : "ml-6"}`}
          >
            <div className="flex items-center">
              {category.children?.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleCategory(category._id)}
                >
                  {expandedCategories.has(category._id) ? (
                    <Icons.chevrondown className="h-4 w-4" />
                  ) : (
                    <Icons.chevronright className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Label className="flex items-center gap-1 cursor-pointer">
                <Input
                  type="checkbox"
                  value={category.slug}
                  className="size-4"
                  checked={filterState.has(category.slug)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      searchParams,
                      pathname,
                      replace,
                      companiesState,
                      categories,
                      category,
                      e.target.checked,
                      filterState,
                      setFilterState
                    )
                  }
                />
                {category.name}
              </Label>
            </div>
            {category.children?.length > 0 &&
              expandedCategories.has(category._id) && (
                <div className="ml-4 mt-2 border-l">
                  {renderCategories(category.children)}
                </div>
              )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mb-8 mt-36">
      <h3 className="text-md font-semibold mb-1">Categories</h3>
      <div className="max-h-[calc(50vh-8rem)] overflow-y-auto">
        {renderCategories(categories.children)}
      </div>
    </div>
  );
};

export default CategoriesFilter;
