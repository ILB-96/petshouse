import { findOneProduct } from "@/actions/product";
import { IDiscount } from "@/models/Discount";
import {
  genericFields,
  genericHandleSubmit,
  genericDefault,
} from "../../formData";

export const defaultValues = {
  ...genericDefault,
  type: "buyXgetY",
  product: "",
  getProduct: "",
  maxUsage: 0,
  buyX: 1,
  getY: 1,
};

export const fields = [
  ...genericFields,
  { name: "product", label: "Product Slug*", type: "text" },
  { name: "getProduct", label: "Recieved Product Slug*", type: "text" },
  {
    name: "maxUsage",
    label: "Max Usage times (0 for limitless)",
    type: "number",
  },
  { name: "buyX", label: "Required Product Amount", type: "number" },
  { name: "getY", label: "Recieved Product Amount", type: "number" },
];

export const handleSubmit = async (data: unknown, id = undefined) => {
  const formData = data as IDiscount;
  const product = await findOneProduct(formData?.product as string);
  const getProduct = await findOneProduct(formData?.getProduct as string);
  formData.product = product ? product._id : undefined;
  formData.getProduct = getProduct ? getProduct._id : undefined;
  if (!formData.product || !formData.getProduct) {
    return "Missing product!";
  }
  return await genericHandleSubmit(formData, id);
};
