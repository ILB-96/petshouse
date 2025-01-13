import { findOneCompany } from "@/actions/company";
import { IDiscount } from "@/models/Discount";
import {
  genericDefault,
  genericFields,
  genericHandleSubmit,
} from "../../formData";

export const defaultValues = {
  ...genericDefault,
  type: "companyDiscount",
  discountAmount: 0,
  discountPercentage: 0,
};

export const fields = [
  ...genericFields,
  { name: "company", label: "Company Slug*", type: "text" },
  { name: "discountAmount", label: "Discount Amount", type: "number" },
  { name: "discountPercentage", label: "Discount Percentage", type: "number" },
];

export const handleSubmit = async (data: unknown, id = undefined) => {
  const formData = data as IDiscount;
  if (formData.discountAmount && formData.discountPercentage) {
    return "You can only set either Discount Amount or Discount Percentage";
  }
  if (!formData.discountAmount && !formData.discountPercentage) {
    return "You must set either Discount Amount or Discount Percentage";
  }
  const company = await findOneCompany(formData?.company as string);
  formData.company = company ? company._id : undefined;
  if (!formData.company) {
    return "Company is missing!";
  }
  return await genericHandleSubmit(formData, id);
};
