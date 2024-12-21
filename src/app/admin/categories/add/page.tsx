"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createCategory } from "@/actions/category";
import { categorySchemaZod } from "@/models/Category";

const defaultValues = {
  name: "",
  slug: "",
  parent: "",
  isDraft: false,
};

const fields = [
  { name: "name", label: "Category Name*", type: "text" },
  { name: "slug", label: "Category Slug*", type: "text" },
  { name: "parent", label: "Category Parent Slug", type: "text" },
  { name: "isDraft", label: "Category Draft Mode", type: "checkbox" },
];

const handleSubmit = async ({
  name,
  slug,
  parent,
  isDraft,
}: {
  name: string;
  slug: string;
  parent: string;
  isDraft: boolean;
}) => {
  const { message } = await createCategory({ name, slug, parent, isDraft });
  return message; // This will be shown as a toast notification
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
