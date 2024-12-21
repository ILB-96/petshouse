"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createCompany } from "@/actions/company";
import { companySchemaZod } from "@/models/Company";

const defaultValues = {
  name: "",
  slug: "",
  url: "",
};

const fields = [
  { name: "name", label: "Company Name*", type: "text" },
  { name: "slug", label: "Company Slug*", type: "text" },
  { name: "url", label: "Company URL", type: "text" },
];

const handleSubmit = async ({
  name,
  slug,
  url,
}: {
  name: string;
  slug: string;
  url: string;
}) => {
  const { message } = await createCompany({ name, slug, url });
  return message ?? "Company created successfully";
};

const AddCompanyPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={companySchemaZod}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddCompanyPage;
