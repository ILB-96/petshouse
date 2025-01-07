import React from "react";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

const CartItemCard = ({ item }: { item: any }) => {
  const updateQuantity = async (action: string) => {
    console.log(action);
  };

  return (
    <Card className="mb-4 flex flex-col md:flex-row justify-between items-center p-4">
      {/* Product Image */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <Image
          src={item.product.images[0]?.source || "/placeholder.png"}
          alt={item.product.images[0]?.caption || "Product image"}
          width={150}
          height={150}
          className="rounded-md object-cover w-full h-auto"
        />
      </div>

      {/* Product Info */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {item.product.name}
        </h2>
        <h4 className="text-xl font-bold text-gray-900 mt-2">
          ${item.product.price}
        </h4>
      </div>

      {/* Quantity and Actions */}
      <div className="w-full md:w-1/4 flex flex-col items-center md:items-end mt-4 md:mt-0 space-y-3">
        <div className="flex items-center space-x-4 flex-row">
          <Button
            variant="outline"
            size="sm"
            className="px-2 py-1"
            onClick={() => updateQuantity("decrease")}
          >
            -
          </Button>
          <p className="text-lg font-medium">{item.quantity}</p>
          <Button
            variant="outline"
            size="sm"
            className="px-2 py-1"
            onClick={() => updateQuantity("increase")}
          >
            +
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center px-3 py-2 text-red-500 border-red-500"
        >
          <Icons.trash />
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default CartItemCard;
