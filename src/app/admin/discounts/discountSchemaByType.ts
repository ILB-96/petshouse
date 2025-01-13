import {
  fields as buyXgetYFields,
  defaultValues as buyXgetYDefaultValues,
  handleSubmit as buyXgetYHandleSubmit,
} from "./add/buyXgetY/formData";
import {
  fields as categoryFields,
  defaultValues as categoryDefaultValues,
  handleSubmit as categoryHandleSubmit,
} from "./add/categoryDiscount/formData";
import {
  fields as companyFields,
  defaultValues as companyDefaultValues,
  handleSubmit as companyHandleSubmit,
} from "./add/companyDiscount/formData";
import {
  fields as freeShippingFields,
  defaultValues as freeShippingDefaultValues,
  handleSubmit as freeShippingHandleSubmit,
} from "./add/freeShipping/formData";
import {
  fields as productFields,
  defaultValues as productDefaultValues,
  handleSubmit as productHandleSubmit,
} from "./add/productDiscount/formData";
import {
  fields as cartFields,
  defaultValues as cartDefaultValues,
  handleSubmit as cartHandleSubmit,
} from "./add/cartDiscount/formData";
import { IDiscount } from "@/models/Discount";
import { Category, Company } from "@/models";
import { findOneProductById } from "@/actions/product";

export const getDiscountSchemaByType = async (discount: IDiscount) => {
  switch (discount.type as string) {
    case "buyXgetY":
      const buyProduct = await findOneProductById(discount?.product as string);
      const getProduct = await findOneProductById(
        discount?.getProduct as string
      );
      return {
        info: { product: buyProduct.slug, getProduct: getProduct.slug },
        fields: buyXgetYFields,
        defaultValues: buyXgetYDefaultValues,
        handleSubmit: buyXgetYHandleSubmit,
      };
    case "categoryDiscount":
      const category = await Category.findById(discount?.category as string);
      return {
        info: { category: category.slug },
        fields: categoryFields,
        defaultValues: categoryDefaultValues,
        handleSubmit: categoryHandleSubmit,
      };
    case "companyDiscount":
      const company = await Company.findById(discount?.company as string);
      return {
        info: { company: company.slug },
        fields: companyFields,
        defaultValues: companyDefaultValues,
        handleSubmit: companyHandleSubmit,
      };
    case "freeShipping":
      return {
        info: {},
        fields: freeShippingFields,
        defaultValues: freeShippingDefaultValues,
        handleSubmit: freeShippingHandleSubmit,
      };
    case "productDiscount":
      const product = await findOneProductById(discount?.product as string);
      return {
        info: { product: product.slug },
        fields: productFields,
        defaultValues: productDefaultValues,
        handleSubmit: productHandleSubmit,
      };
    case "cartDiscount":
      return {
        info: {},
        fields: cartFields,
        defaultValues: cartDefaultValues,
        handleSubmit: cartHandleSubmit,
      };
    default:
      throw new Error(`Unknown discount type: ${discount.type}`);
  }
};
