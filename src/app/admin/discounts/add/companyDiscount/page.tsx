"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import { createDiscount } from "@/actions/discount";
import { findOneCompany } from "@/actions/company";

export const defaultValues = {
  name: "",
  slug: "",
  description: "",
  code: "",
  type: "companyDiscount",
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
  { name: "company", label: "Company Slug*", type: "text" },
  { name: "minSubtotal", label: "Minimum Purchese", type: "number" },
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
  const company = await findOneCompany(formData?.company as string);
  formData.company = company ? company._id : undefined;
  if (!formData.company) {
    return "Company is missing!";
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
