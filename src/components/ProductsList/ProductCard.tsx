"use client";
import { IProduct } from "@/models/Product";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { addItemToLocalStorageCart } from "@/lib/cartStorage";
import { createCartItem } from "@/actions/cart-item";
import { findDiscountsByProduct } from "@/actions/discount";
// import { IDiscount } from "@/models/Discount";

const ProductCard: React.FC<IProduct> = ({ product }) => {
  // const [discount, setDiscount] = useState<IDiscount>();
  const [price, setPrice] = useState<number>();
  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await findDiscountsByProduct(
        product._id,
        product.company._id,
        product.category,
        product.price
      );
      let price = product.price;
      if (response?.highestValue) {
        price -= response.highestValue;
      }
      setPrice(price);
      // if (response?.buyXgetYDiscount) {
      //   setDiscount(response?.buyXgetYDiscount);
      // }
    };
    fetchDiscounts();
    return () => {
      console.log("ProductCard unmounted");
    };
  }, [product]);
  const handleAddToCart = async () => {
    const session = await getSession();
    if (session?.user) {
      await createCartItem(product._id, session.user._id, 1);
    } else {
      const cartItem = { product: product._id, quantity: 1 };
      addItemToLocalStorageCart(cartItem);
    }
    window.location.reload();
  };

  return (
    <Card className="shadow-lg size-fit rounded-md">
      {product.image && (
        <CardContent className="p-0">
          <Image
            src={product.image.source}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 object-cover rounded-md"
          />
        </CardContent>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {`${product.company.name}, ${product.category.name}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add the product price here */}
        <p className="text-lg font-semibold text-gray-800">
          {price && price < product.price ? (
            <>
              <span className="line-through text-red-500">{`$${product.price.toFixed(
                2
              )}`}</span>
              <span className="ml-2 font-bold">{`$${price.toFixed(2)}`}</span>
            </>
          ) : (
            `$${product.price.toFixed(2)}`
          )}
        </p>
        <p>{product.shortDescription}</p>
      </CardContent>
      <CardFooter className="flex justify-around items-center space-x-2">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
        <Button variant="outline" asChild>
          <Link href={`/shop/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
