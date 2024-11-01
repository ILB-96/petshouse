"use client";

import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GeneralForm from "@/components/general-form";
import { createCategory } from "@/actions/category";
import { CategorySchema } from "@/zod-schemas";

const defaultValues = {
  name: "",
  slug: "",
  parentSlug: "",
};

const fields = [
  { name: "name", label: "Category Name*", type: "text" },
  { name: "slug", label: "Category Slug*", type: "text" },
  { name: "parentSlug", label: "Category Parent Slug", type: "text" },
];

const handleSubmit = async ({
  name,
  slug,
  parentSlug,
}: {
  name: string;
  slug: string;
  parentSlug: string;
}) => {
  const { message } = await createCategory({ name, slug, parentSlug });
  return message; // This will be shown as a toast notification
};

const CreateCategoryPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GeneralForm
          formSchema={CategorySchema}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CreateCategoryPage;
