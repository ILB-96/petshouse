import { findOneProduct } from "@/actions/product";
import { IDiscount } from "@/models/Discount";
import {
  genericDefault,
  genericFields,
  genericHandleSubmit,
} from "../../formData";

export const defaultValues = {
  ...genericDefault,
  type: "productDiscount",
  product: "",
  discountAmount: 0,
  discountPercentage: 0,
};

export const fields = [
  ...genericFields,
  { name: "product", label: "Product Slug*", type: "text" },
  { name: "discountAmount", label: "Discount Amount", type: "number" },
  { name: "discountPercentage", label: "Discount Percentage", type: "number" },
];

export const handleSubmit = async (data: unknown, id = undefined) => {
  const formData = data as IDiscount;
  if (formData.discountAmount && formData.discountPercentage) {
    return "You can only set either Discount Amount or Discount Percentage!";
  }
  if (!formData.discountAmount && !formData.discountPercentage) {
    return "You must set either Discount Amount or Discount Percentage!";
  }
  const product = await findOneProduct(formData?.product as string);
  formData.product = product ? product._id : undefined;
  if (!formData.product) {
    return "Missing product!";
  }
  return await genericHandleSubmit(formData, id);
};
