"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createProduct } from "@/actions/product";
import { productSchemaZod } from "@/models/Product";

const defaultValues = {
  name: "",
  slug: "",
  sku: "",
  shortDescription: "",
  price: 0,
  stock: 1,
  categorySlug: "",
  companySlug: "",
  description: "",
  ingredients: "",
};

const fields = [
  { name: "name", label: "Company Name*", type: "text" },
  { name: "slug", label: "Company Slug*", type: "text" },
  { name: "sku", label: "SKU*", type: "text" },
  { name: "shortDescription", label: "Short Description*", type: "text" },
  { name: "price", label: "Price*", type: "number" },
  { name: "stock", label: "Stock*", type: "number" },
  { name: "categorySlug", label: "Category Slug*", type: "text" },
  { name: "companySlug", label: "Company Slug*", type: "text" },
  { name: "description", label: "Description*", type: "rich-text" },
  { name: "ingredients", label: "Ingredients", type: "rich-text" },
];

const handleSubmit = async ({
  name,
  slug,
  sku,
  shortDescription,
  price,
  stock,
  categorySlug,
  companySlug,
  description,
  ingredients,
}: {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: number;
  stock: number;
  categorySlug: string;
  companySlug: string;
  description: string;
  ingredients: string;
}) => {
  const { message } = await createProduct({
    name,
    slug,
    sku,
    shortDescription,
    price,
    stock,
    categorySlug,
    companySlug,
    description,
    ingredients,
  });
  return message ?? "Product created successfully";
};

const AddCompanyPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={productSchemaZod}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddCompanyPage;
