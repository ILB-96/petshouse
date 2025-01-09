"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import { createDiscount } from "@/actions/discount";
import { findOneProduct } from "@/actions/product";

export const defaultValues = {
  name: "",
  slug: "",
  description: "",
  code: "",
  type: "buyXgetY",
  minSubtotal: 1,
  product: "",
  getProduct: "",
  maxUsage: 0,
  buyX: 1,
  getY: 1,
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
  { name: "product", label: "Product Slug*", type: "text" },
  { name: "getProduct", label: "Recieved Product Slug*", type: "text" },
  { name: "minSubtotal", label: "Minimum Purchese", type: "number" },
  {
    name: "maxUsage",
    label: "Max Usage times (0 for limitless)",
    type: "number",
  },
  { name: "buyX", label: "Required Product Amount", type: "number" },
  { name: "getY", label: "Recieved Product Amount", type: "number" },
];

export const handleSubmit = async (data: unknown) => {
  const formData = data as IDiscount;
  const product = await findOneProduct(formData?.product as string);
  console.log(product);
  const getProduct = await findOneProduct(formData?.getProduct as string);
  formData.product = product ? product._id : undefined;
  formData.getProduct = getProduct ? getProduct._id : undefined;
  if (!formData.product || !formData.getProduct) {
    return "Missing product!";
  }
  const { message } = await createDiscount(formData);
  return message;
};

const AddDiscountPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={discountSchemaZod}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddDiscountPage;
