"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GenericForm from "@/components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import { findOneDiscount, updateDiscount } from "@/actions/discount";
import { discountSchemaZod, IDiscount } from "@/models/Discount";
import {
  fields as buyXgetYFields,
  defaultValues as buyXgetYDefaultValues,
  handleSubmit as buyXgetYHandleSubmit,
} from "../add/buyXgetY/page";
import {
  fields as categoryFields,
  defaultValues as categoryDefaultValues,
  handleSubmit as categoryHandleSubmit,
} from "../add/categoryDiscount/page";
import {
  fields as companyFields,
  defaultValues as companyDefaultValues,
  handleSubmit as companyHandleSubmit,
} from "../add/companyDiscount/page";
import {
  fields as freeShippingFields,
  defaultValues as freeShippingDefaultValues,
  handleSubmit as freeShippingHandleSubmit,
} from "../add/freeShipping/page";
import {
  fields as productFields,
  defaultValues as productDefaultValues,
  handleSubmit as productHandleSubmit,
} from "../add/productDiscount/page";
import {
  fields as cartFields,
  defaultValues as cartDefaultValues,
  handleSubmit as cartHandleSubmit,
} from "../add/cartDiscount/page";
const DiscountViewPage = () => {
  const [discount, setDiscount] = useState<IDiscount | null>();
  const [defaultValues, setDefaultValues] = useState(null);
  const [fields, setFields] = useState(null);
  const [handleSubmit, setHandleSubmit] = useState(null);
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
        if (discount?.type === "buyXgetY") {
          setDefaultValues(buyXgetYDefaultValues);
          setFields(buyXgetYFields);
          setHandleSubmit(buyXgetYHandleSubmit);
        } else if (discount?.type === "categoryDiscount") {
          setDefaultValues(categoryDefaultValues);
          setFields(categoryFields);
          setHandleSubmit(categoryHandleSubmit);
        } else if (discount?.type === "companyDiscount") {
          setDefaultValues(companyDefaultValues);
          setFields(companyFields);
          setHandleSubmit(companyHandleSubmit);
        } else if (discount?.type === "freeShipping") {
          setDefaultValues(freeShippingDefaultValues);
          setFields(freeShippingFields);
          setHandleSubmit(freeShippingHandleSubmit);
        } else if (discount?.type === "productDiscount") {
          setDefaultValues({
            ...productDefaultValues,
            ...discount,
          });
          setFields(productFields);
          setHandleSubmit(productHandleSubmit);
        } else if (discount?.type === "cartDiscount") {
          setDefaultValues(cartDefaultValues);
          setFields(cartFields);
          setHandleSubmit(cartHandleSubmit);
        }
        console.log(discount.startDate.toString().split("T")[0]);
      } else {
        router.push("/admin/discounts");
      }
    };

    fetchDiscount();
  }, [params, router]);

  if (!discount) {
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
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default DiscountViewPage;
