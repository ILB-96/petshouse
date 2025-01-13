import { createDiscount, updateDiscount } from "@/actions/discount";
import { IDiscount } from "@/models/Discount";

export const genericDefault = {
  name: "",
  slug: "",
  description: "",
  code: "",
  minSubtotal: 1,
  startDate: new Date(),
};
export const genericFields = [
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
];

export const genericHandleSubmit = async (data: unknown, id = undefined) => {
  const formData = data as IDiscount;

  if (id) {
    const { message } = await updateDiscount(id, formData);
    return message;
  }
  const { message } = await createDiscount(formData);
  return message;
};
