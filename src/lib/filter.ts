export const updateURL = (
  searchParams,
  pathname,
  replace,
  newFilters,
  newCompanies
) => {
  const params = new URLSearchParams(searchParams);

  if (newFilters.size > 0) {
    params.set("filters", Array.from(newFilters).join(","));
  } else {
    params.delete("filters");
  }

  if (newCompanies.size > 0) {
    params.set("companies", Array.from(newCompanies).join(","));
  } else {
    params.delete("companies");
  }

  params.set("page", "1");
  replace(`${pathname}?${params.toString()}`);
};
export const handleCheckboxChange = (
  searchParams,
  pathname,
  replace,
  companyState,
  categories,
  category,
  checked,
  filterState,
  setFilterState
) => {
  const newFilterState = new Set(filterState);
  if (checked) {
    newFilterState.add(category.slug);
    let parent = category.parent;
    while (parent) {
      newFilterState.delete(parent);
      parent = findParentCategory(categories, parent)?.parent;
    }
    removeChildCategories(category, newFilterState);
  } else {
    newFilterState.delete(category.slug);
  }
  setFilterState(newFilterState);
  updateURL(searchParams, pathname, replace, newFilterState, companyState);
};

export const findParentCategory = (root, childSlug) => {
  if (root.children) {
    for (const child of root.children) {
      if (child.slug === childSlug) {
        return root;
      }
      const found = findParentCategory(child, childSlug);
      if (found) return found;
    }
  }
  return null;
};

export const removeChildCategories = (category, filterSet) => {
  if (category.children) {
    category.children.forEach((child) => {
      filterSet.delete(child.slug);
      removeChildCategories(child, filterSet);
    });
  }
};
