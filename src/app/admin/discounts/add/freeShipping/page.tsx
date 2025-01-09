"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import { createDiscount } from "@/actions/discount";

const defaultValues = {
  name: "",
  slug: "",
  minSubtotal: 1,
  descrption: "",
  code: "",
  type: "freeShipping",
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
  { name: "startDate", label: "Start Date*", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "minSubtotal", label: "Minimum Purchese*", type: "number" },
];

const handleSubmit = async (data: unknown) => {
  const formData = data as IDiscount;
  const { message } = await createDiscount(formData);
  return message;
};

const AddFreeShippingDiscountPage = () => {
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

export default AddFreeShippingDiscountPage;
