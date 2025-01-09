"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GenericForm from "@/components/GenericForm/GenericForm";
import { editCategory, findOneCategory } from "@/actions/category";
import { useEffect, useState } from "react";
import { Category, categorySchemaZod, ICategory } from "@/models/Category";
import { findOneDiscount, updateDiscount } from "@/actions/discount";
import { IDiscount } from "@/models/Discount";

const fields = [
  { name: "name", label: "Category Name*", type: "text" },
  { name: "slug", label: "Category Slug*", type: "text" },
  { name: "description", label: "Category Parent Slug", type: "text" },
  { name: "isDraft", label: "Category Draft Mode", type: "checkbox" },
];

const handleSubmit = async ({
  name,
  slug,
  description,
  conditions,
  actions,
  startDate,
  endDate,
}: IDiscount) => {
  const { message } = await updateDiscount({
    name,
    slug,
    description,
    conditions,
    actions,
    startDate,
    endDate,
  });
  return message;
};

const DiscountViewPage = () => {
  const [discount, setDiscount] = useState<IDiscount | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchDiscount = async () => {
      const id = params.discount;

      if (!id) {
        router.push("/admin/discounts");
        return;
      }

      const discount = await findOneDiscount(id as string);
      if (discount) {
        setDiscount(discount);
      } else {
        router.push("/admin/discounts");
      }
    };

    fetchDiscount();
  }, [params, router]);

  if (!discount) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: discount.name,
    slug: discount.slug,
    description: discount.description,
    startDate: discount.startDate,
    endDate: discount.endDate,
  };

  return (
    <MainContainer>
      <SectionContainer>
        <HeroTitle>{discount.slug}</HeroTitle>
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

export default DiscountViewPage;
