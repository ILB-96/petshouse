"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createCategory } from "@/actions/category";
import { categorySchemaZod, ICategory } from "@/models/Category";
import { FieldProps } from "@/types";

const defaultValues = {
  name: "",
  slug: "",
  parent: "",
  isDraft: false,
};

const fields: FieldProps[] = [
  { name: "name", label: "Category Name*", type: "text" },
  { name: "slug", label: "Category Slug*", type: "text" },
  { name: "parent", label: "Category Parent Slug", type: "text" },
  { name: "isDraft", label: "Category Draft Mode", type: "checkbox" },
];

const handleSubmit = async (formData: unknown) => {
  const { message } = await createCategory(formData as ICategory);
  return message;
};

const AddCategoryPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={categorySchemaZod}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddCategoryPage;
