import { ICartItem } from "@/models/CartItem";
import { ICategory } from "@/models/Category";
import { ICompany } from "@/models/Company";
import { IDiscount } from "@/models/Discount";
import { IMedia } from "@/models/Media";
import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import { Session } from "next-auth";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export interface SearchParams {
  q?: string;
  page?: number;
  category?: string;
  companies?: string;
  filters?: string;
  companiesFilter?: string;
  sortby?: string;
}
export interface FieldProps {
  type?: string;
  name: string;
  label: string;
  default?: string;
  hidden?: boolean;
  values?: { label: string; value: string }[];
}

export interface FormFieldProps {
  field: FieldProps;
  form: UseFormReturn;
  formField: ControllerRenderProps<Record<string, unknown>, string>;
}

export interface MainFilterProps {
  searchParams: URLSearchParams;
  pathname: string;
  replace: (url: string) => void;
  companyState: Set<unknown>;
  filterState: Set<unknown>;
}

export interface URLProps {
  searchParams: URLSearchParams;
  pathname: string;
  replace: (url: string) => void;
  filterState: Set<unknown>;
  companyState: Set<unknown>;
}
export type updateURLType = (data: URLProps) => void;

export type AuthSession = Session & {
  accessToken?: unknown;
  refreshToken?: unknown;
};

export type PopulatedProduct = IProduct & {
  images: IMedia[];
  category: ICategory | string;
  company: ICompany | string;
  image?: IMedia;
  newPrice?: number;
};

export type PopulatedCartItem = ICartItem & {
  product: PopulatedProduct;
  user: IUser | string;
};

export type PopulatedProductDiscount = IDiscount & {
  product: PopulatedProduct;
};

export type PopulatedCompanyDiscount = IDiscount & {
  company: ICompany;
};
export type PopulatedCategoryDiscount = IDiscount & {
  category: ICategory;
};
