import React from "react";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";

const BuyXGetYCard: React.FC<DiscountCarouselItemProps> = ({ discount }) => {
  return (
    <div>
      <h3>{discount.name}</h3>
      <p>{discount.description}</p>
      <div>
        <span>
          Buy {discount.buyX} get {discount.getY} free!
        </span>
      </div>
    </div>
  );
};

export default BuyXGetYCard;
