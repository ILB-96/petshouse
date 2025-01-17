import React from "react";
import BuyXGetYCard from "./BuyXGetYCard";
import ProductDiscountCard from "./ProductDiscountCard";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";
import GenericDiscountCard from "./GenericDiscountCard";
import { PopulatedProductDiscount } from "@/types";

const CarouselDiscountCard: React.FC<DiscountCarouselItemProps> = ({
  discount,
}) => {
  switch (discount.type as string) {
    case "buyXGetY":
      return <BuyXGetYCard discount={discount} />;
    case "productDiscount":
      return (
        <ProductDiscountCard discount={discount as PopulatedProductDiscount} />
      );
    default:
      return <GenericDiscountCard discount={discount} />;
  }
};

export default CarouselDiscountCard;
