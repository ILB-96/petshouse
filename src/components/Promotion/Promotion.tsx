"use client";
import { SectionContainer } from "@/styles/style";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { findAllDiscounts } from "@/actions/discount";
import CarouselDiscountList from "./CarouselDiscountList";

const Promotion = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await findAllDiscounts();
        console.log(response);
        setDiscounts(response);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);
  if (discounts.length == 0) {
    return null;
  }
  return (
    <SectionContainer>
      <Carousel
        className="w-1/2 mx-auto"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          <CarouselDiscountList discounts={discounts} />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
};

export default Promotion;
