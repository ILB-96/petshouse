import React from "react";
import { CarouselItem } from "../ui/carousel";
import { IDiscount } from "@/models/Discount";
import CarouselDiscountCard from "./CarouselDiscountCard";
import {
  PopulatedCompanyDiscount,
  PopulatedProduct,
  PopulatedProductDiscount,
} from "@/types";

interface DiscountCarouselListProps {
  discounts: IDiscount[];
}
export interface DiscountCarouselItemProps {
  discount: IDiscount | PopulatedProductDiscount | PopulatedCompanyDiscount;
  products?: PopulatedProduct[];
}
const CarouselDiscountList: React.FC<DiscountCarouselListProps> = ({
  discounts,
}) => {
  return (
    <>
      {discounts.map((discount) => (
        <CarouselItem
          key={discount._id as string}
          className="pl-1 md:basis-1/2"
        >
          <CarouselDiscountCard discount={discount} />
        </CarouselItem>
      ))}
    </>
  );
};

export default CarouselDiscountList;
