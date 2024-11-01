"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GeneralForm from "@/components/general-form";
import { editCategory, findOneCategory } from "@/actions/category";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ICompany } from "@/models/Company";

const fields = [
  { name: "name", label: "Company Name*", type: "text" },
  { name: "url", label: "Company URL", type: "text" },
];

const handleSubmit = async ({ name, slug }: { name: string; slug: string }) => {
  const { message } = await editCategory({ name, slug, parentSlug });
  return message;
};

const CompanyViewPage = () => {
  const [category, setCategory] = useState<ICompany | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      const slug = params.category;

      if (!slug) {
        router.push("/admin/companies");
        return;
      }

      const category = await findOneCategory(slug as string);
      if (await category) {
        console.log(category);
        setCategory(category);
      } else {
        router.push("/admin/companies");
      }
    };

    fetchCategory();
  }, [params, router]);

  if (!category) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: category.name,
    slug: category.slug,
    parentSlug: category.parent,
  };

  return (
    <MainContainer>
      <SectionContainer>
        <HeroTitle>{category.slug}</HeroTitle>
        <GeneralForm
          formSchema={formSchema}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoryViewPage;
