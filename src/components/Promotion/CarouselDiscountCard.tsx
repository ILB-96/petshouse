import React from "react";
import BuyXGetYCard from "./BuyXGetYCard";
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
