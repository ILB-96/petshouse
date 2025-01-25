import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import CartItemButtons from "./CartItemButtons";
import { PopulatedCartItem } from "@/types";

const CartItemCard = ({ item }: { item: PopulatedCartItem }) => {
  return (
    <Card className="mb-4 flex flex-col md:flex-row justify-between items-center p-4">
      <div className="w-full md:w-1/4 flex-shrink-0">
        <Image
          src={item.product.images[0]?.source}
          alt={item.product.images[0]?.caption || item.product.images[0].name}
          width={150}
          height={150}
          className="rounded-md object-cover w-full h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
        <h2 className="text-lg text-gray-800">{item.product.name}</h2>
        <p className="text-lg font-semibold text-gray-800">
          {item.product.newPrice &&
          item.product.newPrice < item.product.price ? (
            <>
              <span className="line-through text-red-500">{`$${item.product.price.toFixed(
                2
              )}`}</span>
              <span className="ml-2 font-bold">{`$${item.product.newPrice.toFixed(
                2
              )}`}</span>
            </>
          ) : (
            `$${item.product.price.toFixed(2)}`
          )}
        </p>
        {item.product.stock < 10 ||
          (item.product.stock < item.quantity && (
            <p className="text-red-400">{item.product.stock} left in stock.</p>
          ))}
      </div>
      <CartItemButtons item={item} />
    </Card>
  );
};

export default CartItemCard;
