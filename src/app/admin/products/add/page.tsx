"use client";
import { MainContainer, SectionContainer } from "@/styles/style";
import React, { useEffect, useState } from "react";
import GenericForm from "@/components/GenericForm/GenericForm";
import { createProduct } from "@/actions/product";
import { IProduct, productSchemaZod } from "@/models/Product";
import { findAllCompaniesSlug as findAllCompanies } from "@/actions/company"; // Import your server action for companies
import { findAllCategories as findAllCategories } from "@/actions/category"; // Assuming there's a similar action for categories

const handleSubmit = async (product: IProduct) => {
  console.log(product);
  const { message } = await createProduct(product);
  return message ?? "Product created successfully";
};

const AddProductPage = () => {
  const [fields, setFields] = useState([
    { name: "name", label: "Product Name*", type: "text" },
    { name: "slug", label: "Product Slug*", type: "text" },
    { name: "sku", label: "SKU*", type: "text" },
    { name: "shortDescription", label: "Short Description*", type: "text" },
    { name: "price", label: "Price*", type: "number", default: 1 },
    { name: "stock", label: "Stock*", type: "number", default: 1 },
    {
      name: "category",
      label: "Category Slug*",
      type: "dropdown",
      values: [],
    },
    {
      name: "company",
      label: "Company Slug*",
      type: "dropdown",
      values: [],
    },
    { name: "description", label: "Description*", type: "rich-text" },
    { name: "ingredients", label: "Ingredients", type: "rich-text" },
    { name: "images", label: "Images", type: "file" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch companies
        const companies = await findAllCompanies();
        const companySlugs = companies?.map((company: any) => ({
          label: company.slug,
          value: company._id,
        }));

        // Fetch categories
        const categories = await findAllCategories();
        const categorySlugs = categories?.map((category: any) => ({
          label: category.slug,
          value: category._id,
        }));

        setFields((prevFields) =>
          prevFields.map((field: any) => {
            if (field.name === "company") {
              return {
                ...field,
                values: companySlugs || [],
                default: companySlugs?.[0] || "",
              };
            }
            if (field.name === "category") {
              return {
                ...field,
                values: categorySlugs || [],
                default: categorySlugs?.[0] || "",
              };
            }
            return field;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainContainer>
      <SectionContainer>
        <GenericForm
          formSchema={productSchemaZod}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default AddProductPage;
