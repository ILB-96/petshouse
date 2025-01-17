"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GenericForm from "@/components/GenericForm/GenericForm";
import { editCategory, findOneCategory } from "@/actions/category";
import { useEffect, useState } from "react";
import { categorySchemaZod, ICategory } from "@/models/Category";

const fields = [
  { name: "name", label: "Category Name*", type: "text" },
  { name: "slug", label: "Category Slug*", type: "text" },
  { name: "parent", label: "Category Parent Slug", type: "text" },
  { name: "isDraft", label: "Category Draft Mode", type: "checkbox" },
];

const handleSubmit = async (formData: unknown) => {
  const { message } = await editCategory(formData as ICategory);
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
        router.push("/admin/categories");
        return;
      }

      const category = (await findOneCategory(slug as string)) as unknown;
      if (category) {
        setCategory(category as ICategory);
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
    parent: category.parent,
  };

  return (
    <MainContainer>
      <SectionContainer>
        <HeroTitle>{category.slug}</HeroTitle>
        <GenericForm
          formSchema={categorySchemaZod}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoryViewPage;
