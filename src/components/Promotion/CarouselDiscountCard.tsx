import { IDiscount } from "@/models/Discount";
import React from "react";
import BuyXGetYCard from "./buyXgetYCard";
import ProductDiscountCard from "./ProductDiscountCard";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";
import GenericDiscountCard from "./GenericDiscountCard";

const CarouselDiscountCard: React.FC<DiscountCarouselItemProps> = ({
  discount,
}) => {
  switch (discount.type as string) {
    case "buyXGetY":
      return <BuyXGetYCard discount={discount} />;
    case "productDiscount":
      return <ProductDiscountCard discount={discount} />;
    default:
      return <GenericDiscountCard discount={discount} />;
  }
};

export default CarouselDiscountCard;
