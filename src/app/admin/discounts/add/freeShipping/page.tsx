"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { discountSchemaZod } from "@/models/Discount";
import { defaultValues, fields, handleSubmit } from "./formData";

const AddFreeShippingDiscountPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={discountSchemaZod}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
          buttonName="Create"
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddFreeShippingDiscountPage;
