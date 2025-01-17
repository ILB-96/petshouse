"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GenericForm from "@/components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import { findOneDiscount } from "@/actions/discount";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import { getDiscountSchemaByType } from "../discountSchemaByType";
import { FieldProps } from "@/types";

const DiscountViewPage = () => {
  const [discount, setDiscount] = useState<IDiscount | null>(null); // Ensure null is properly handled
  const [defaultValues, setDefaultValues] = useState({});
  const [fields, setFields] = useState<FieldProps[]>([]);
  const [handleSubmit, setHandleSubmit] = useState<
    ((data: unknown) => Promise<string>) | undefined
  >(undefined);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchDiscount = async () => {
      const id = params.discount;

      if (!id) {
        router.push("/admin/discounts");
        return;
      }

      try {
        const discount = await findOneDiscount(id as string);
        if (discount) {
          setDiscount(discount);
          const { info, fields, defaultValues, handleSubmit } =
            await getDiscountSchemaByType(discount);

          const handleUpdate = async (data: unknown): Promise<string> => {
            if (handleSubmit) {
              await handleSubmit(data, discount._id);
            }
            return "Update successful";
          };
          const defaultData = { ...defaultValues, ...discount, ...info };
          setDefaultValues({ ...defaultValues, ...discount, ...info });
          setFields(fields);
          setHandleSubmit(() => handleUpdate);
        } else {
          router.push("/admin/discounts");
        }
      } catch (error) {
        console.error("Failed to fetch discount:", error);
        router.push("/admin/discounts");
      }
    };

    fetchDiscount();
  }, [params, router]);

  if (!discount || !defaultValues || fields.length == 0 || !handleSubmit) {
    return <div>Loading...</div>;
  }
  return (
    <MainContainer>
      <SectionContainer>
        <HeroTitle>{discount.slug}</HeroTitle>
        <GenericForm
          formSchema={discountSchemaZod}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          buttonName="Update"
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default DiscountViewPage;
