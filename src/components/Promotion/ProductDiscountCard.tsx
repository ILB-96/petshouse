import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { NavLink } from "@/styles/style";
import { PopulatedProductDiscount } from "@/types";
import CardTimer from "./CardTimer";
import TotalDiscountCard from "./TotalDiscountCard";

const ProductDiscountCard: React.FC<{ discount: PopulatedProductDiscount }> = ({
  discount,
}) => {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={discount.product?.images[0].source}
          alt={discount.product?.images[0].caption || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-lg"
        />
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {discount.name}
        </h2>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-4">{discount.description}</p>
        <CardTimer endDate={discount.endDate as Date} />
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 bg-gray-50 space-x-2">
        {/* Discount Details */}
        <div className="text-gray-700">
          <TotalDiscountCard
            amount={discount.discountAmount as number}
            percentage={discount.discountPercentage as number}
          />
          {discount.endDate && (
            <p className="text-xs text-gray-500">
              Ends on: {discount?.endDate?.toString().split("T")[0]}
            </p>
          )}
        </div>

        {/* Call-to-Action */}
        <Button
          asChild
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <NavLink href={`/shop/${discount.product?.slug}`}>Buy Now</NavLink>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductDiscountCard;
