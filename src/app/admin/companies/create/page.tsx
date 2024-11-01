"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GeneralForm from "@/components/general-form";
import { createCompany } from "@/actions/company";
import { companySchema } from "@/zod-schemas";

const defaultValues = {
  name: "",
  url: "",
};

const fields = [
  { name: "name", label: "Company Name*", type: "text" },
  { name: "url", label: "Company URL", type: "text" },
];

const handleSubmit = async ({ name, url }: { name: string; url: string }) => {
  const { message } = await createCompany({ name, url });
  return message ?? "Company created successfully"; // Ensure a string is always returned
};

const CreateCompanyPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GeneralForm
          formSchema={companySchema}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CreateCompanyPage;
