import { IDiscount } from "@/models/Discount";
import {
  genericDefault,
  genericFields,
  genericHandleSubmit,
} from "../../formData";

export const defaultValues = {
  ...genericDefault,
  type: "cartDiscount",
  discountPercentage: 0,
  discountAmount: 0,
};

export const fields = [
  ...genericFields,
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
  return await genericHandleSubmit(formData, id);
};
