"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import { createDiscount } from "@/actions/discount";
import { findOneProduct } from "@/actions/product";

const defaultValues = {
  name: "",
  slug: "",
  description: "",
  code: "",
  type: "buyXgetY",
  buyX: 1,
  getY: 1,
};

const fields = [
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
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "minSubtotal", label: "Minimum Purchese", type: "number" },
  {
    name: "maxUsage",
    label: "Max Usage Per Order (empty for stacking)",
    type: "number",
  },
  { name: "product", label: "Product Slug", type: "text" },
  { name: "buyX", label: "Buy", type: "number" },
  { name: "getProduct", label: "Get Product Slug", type: "text" },
  { name: "getY", label: "Get", type: "number" },
];

const handleSubmit = async (formData: IDiscount) => {
  console.log("Hello");
  const product = await findOneProduct(formData?.product as string);
  const getProduct = await findOneProduct(formData?.getProduct as string);
  formData.product = product ? product._id : null;
  formData.getProduct = getProduct ? getProduct._id : null;
  if (formData.product && formData.getProduct) {
    const { message } = await createDiscount(formData);
    return message;
  }
  console.log("What");
  return { message: "Missing products!" };
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
