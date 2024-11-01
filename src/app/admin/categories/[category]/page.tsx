"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GeneralForm from "@/components/general-form";
import { editCategory, findOneCategory } from "@/actions/category";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Category, ICategory } from "@/models/Category";
import { CategorySchema } from "@/zod-schemas";

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
  const { message } = await editCategory({ name, slug, parentSlug });
  return message;
};

const CategoryViewPage = () => {
  const [category, setCategory] = useState<ICategory | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      const slug = params.category;

      if (!slug) {
        router.push("/admin/view-categories");
        return;
      }

      const category = await findOneCategory(slug as string);
      if (await category) {
        console.log(category);
        setCategory(category);
      } else {
        router.push("/admin/categories");
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
          formSchema={CategorySchema}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoryViewPage;
