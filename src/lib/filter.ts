import { CategoryTree } from "@/actions/category";
import { URLProps } from "@/types";

export const updateURL = (data: URLProps): void => {
  const params = new URLSearchParams(data.searchParams);

  if (data.filterState.size > 0) {
    params.set("filters", Array.from(data.filterState).join(","));
  } else {
    params.delete("filters");
  }

  if (data.companyState.size > 0) {
    params.set("companies", Array.from(data.companyState).join(","));
  } else {
    params.delete("companies");
  }

  params.set("page", "1");
  data.replace(`${data.pathname}?${params.toString()}`);
};
type HandleCheckboxProps = URLProps & {
  categories: CategoryTree;
  category: CategoryTree;
  checked: boolean;
  setFilterState: (filterState: Set<unknown>) => void;
};

export const handleCheckboxChange = (checkboxData: HandleCheckboxProps) => {
  const newFilterState = new Set(checkboxData.filterState);
  if (checkboxData.checked) {
    newFilterState.add(checkboxData.category.slug);
    let parent = checkboxData.category.parent;
    while (parent) {
      newFilterState.delete(parent);
      parent = findParentCategory(checkboxData.categories, parent)?.parent;
    }
    removeChildCategories(checkboxData.category, newFilterState);
  } else {
    newFilterState.delete(checkboxData.category.slug);
  }
  checkboxData.setFilterState(newFilterState);
  const data = {
    searchParams: checkboxData.searchParams,
    pathname: checkboxData.pathname,
    replace: checkboxData.replace,
    filterState: newFilterState,
    companyState: checkboxData.companyState,
  };
  updateURL(data);
};

export const findParentCategory = (
  root: CategoryTree,
  childSlug: string
): null | CategoryTree => {
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

export const removeChildCategories = (
  category: CategoryTree,
  filterSet: Set<unknown>
) => {
  if (category.children) {
    category.children.forEach((child) => {
      filterSet.delete(child.slug);
      removeChildCategories(child, filterSet);
    });
  }
};
