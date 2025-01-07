import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import CartItemButtons from "./CartItemButtons";

const CartItemCard = async ({ item }: { item: any }) => {
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

      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
        <h2 className="text-lg text-gray-800">{item.product.name}</h2>
        <h4 className="text-xl font-semibold text-gray-900 mt-2">
          ${item.product.price}
        </h4>
        {item.product.stock < 10 ||
          (item.product.stock < item.quantity && (
            <p className="text-red-400">{item.product.stock} left in stock.</p>
          ))}
      </div>
      <CartItemButtons itemId={item._id.toString()} quantity={item.quantity} />
    </Card>
  );
};

export default CartItemCard;
