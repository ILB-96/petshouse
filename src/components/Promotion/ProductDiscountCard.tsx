import React, { useEffect, useState } from "react";
import { DiscountCarouselItemProps } from "./CarouselDiscountList";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { IProduct } from "@/models/Product";
import { Button } from "../ui/button";
import { NavLink } from "@/styles/style";

const ProductDiscountCard: React.FC<DiscountCarouselItemProps> = ({
  discount,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Calculate and update time left till promotion ends
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date(discount.endDate); // Ensure discount.endDate is a valid Date string
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Promotion ended");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [discount.endDate]);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={(discount.product as IProduct)?.images[0].source}
          alt={(discount.product as IProduct)?.images[0].caption || "Product"}
          layout="fill"
          objectFit="cover"
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

        {/* Time Left */}
        {timeLeft && (
          <div className="text-red-600 font-semibold text-sm">
            Time left: {timeLeft}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 bg-gray-50">
        {/* Discount Details */}
        <div className="text-gray-700">
          {discount.discountPercentage && (
            <p className="text-sm font-semibold">
              Save {discount?.discountPercentage}%!
            </p>
          )}
          {discount.discountAmount && (
            <p className="text-sm font-semibold">
              Save {discount?.discountAmount}$!
            </p>
          )}
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
