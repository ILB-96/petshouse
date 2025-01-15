import React from "react";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";
import { Card, CardContent, CardFooter } from "../ui/card";

const GenericDiscountCard: React.FC<DiscountCarouselItemProps> = ({
  discount,
}) => {
  return (
    <Card>
      <CardContent className="flex h-[16.93rem] aspect-square items-center justify-center p-6">
        <span className="text-2xl font-semibold">{discount.name}</span>
      </CardContent>
      <CardFooter>
        <p>{discount?.description}</p>
      </CardFooter>
    </Card>
  );
};

export default GenericDiscountCard;
