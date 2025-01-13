import { findOneCategory } from "@/actions/category";
import { createDiscount } from "@/actions/discount";
import { IDiscount } from "@/models/Discount";

export const defaultValues = {
  name: "",
  slug: "",
  descrption: "",
  code: "",
  type: "categoryDiscount",
  minSubtotal: 1,
  discountAmount: 0,
  discountPercentage: 0,
};

export const fields = [
  {
    name: "type",
    label: "Discount Type",
    type: "text",
    hidden: true,
  },
  { name: "name", label: "Discount Name*", type: "text" },
  { name: "slug", label: "Discount Slug*", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "code", label: "Coupon Code", type: "text" },
  { name: "startDate", label: "Start Date*", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "minSubtotal", label: "Minimum Purchese", type: "number" },
  { name: "category", label: "Category Slug*", type: "text" },
  { name: "discountAmount", label: "Discount Amount", type: "number" },
  { name: "discountPercentage", label: "Discount Percentage", type: "number" },
];

export const handleSubmit = async (data: unknown) => {
  const formData = data as IDiscount;
  if (formData.discountAmount && formData.discountPercentage) {
    return "You can only set either Discount Amount or Discount Percentage";
  }
  if (!formData.discountAmount && !formData.discountPercentage) {
    return "You must set either Discount Amount or Discount Percentage";
  }
  const category = await findOneCategory(formData?.category as string);
  formData.category = category ? category._id : undefined;
  if (!formData.category) {
    return "Missing category!";
  }
  const { message } = await createDiscount(formData);
  return message;
};
