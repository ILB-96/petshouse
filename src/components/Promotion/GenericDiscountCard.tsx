import React from "react";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";
import { Card, CardContent, CardFooter } from "../ui/card";
import CardTimer from "./CardTimer";
import { PopulatedProduct } from "@/types";
import Image from "next/image";
const GenericDiscountCard: React.FC<DiscountCarouselItemProps> = ({
  discount,
  products,
}) => {
  return (
    <Card className="h-fit">
      {products && (
        <div className="relative w-full bg-transparent h-48 flex items-center overflow-clip justify-center">
          {products.map((product: PopulatedProduct, index: number) => (
            <div
              key={product.images[0]._id as string}
              className={`relative w-24 overflow-hidden h-full  ${
                index === 0
                  ? "left-[-16%]"
                  : index === 1 && products.length === 2
                  ? "left-[16%]"
                  : index === 1
                  ? "left-1/3"
                  : "left-2/3"
              }`}
              style={{ zIndex: 3 - index }}
            >
              <Image
                src={product?.images[0].source}
                alt={product?.images[0].caption || "Product"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-lg"
              />
            </div>
          ))}
        </div>
      )}
      <CardContent className="flex h-[12.4rem]  items-center justify-center">
        <span className="text-2xl font-semibold overflow-ellipsis">
          {discount.name}
        </span>
        <CardTimer endDate={discount.endDate as Date} />
      </CardContent>
      {discount.description && (
        <CardFooter>
          <p>{discount?.description}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default GenericDiscountCard;
