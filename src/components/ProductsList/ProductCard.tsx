"use client";
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
import { getSession, useSession } from "next-auth/react";
import { addItemToLocalStorageCart } from "@/lib/cartStorage";
import { createCartItem } from "@/actions/cart-item";
import { findDiscountsByProduct } from "@/actions/discount";
import { PopulatedCartItem, PopulatedProduct } from "@/types";
import { ICompany } from "@/models/Company";
import { ICategory } from "@/models/Category";
import { useCart } from "@/providers/CartContext";
import { ICartItem } from "@/models/CartItem";
// import { IDiscount } from "@/models/Discount";

const ProductCard: React.FC<{ product: PopulatedProduct }> = ({ product }) => {
  // const [discount, setDiscount] = useState<IDiscount>();
  const [price, setPrice] = useState<number>();
  const { addToCart } = useCart();
  const session = useSession();
  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await findDiscountsByProduct(
        product._id as string,
        (product.company as ICompany)._id as string,
        product.category as ICategory,
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
  }, [product]);
  const handleAddToCart = async () => {
    let cartItem: PopulatedCartItem | ICartItem;
    if (session?.data?.user) {
      cartItem = await createCartItem(
        product._id as string,
        session.data.user._id,
        1
      );
      if (!cartItem) return;
      cartItem = {
        ...(cartItem as ICartItem),
        product: { ...product, newPrice: price, images: [product.image] },
      } as PopulatedCartItem;
    } else {
      cartItem = {
        product: { ...product, newPrice: price, images: [product.image] },
        quantity: 1,
      } as PopulatedCartItem;
    }
    addToCart(cartItem as PopulatedCartItem);
  };

  return (
    <Card className="shadow-lg rounded-md h-full flex flex-col">
      {product.image && (
        <CardContent className="p-0">
          <Image
            src={product.image.source}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-md"
          />
        </CardContent>
      )}
      <CardHeader>
        <Link href={`/shop/${product.slug}`}>
          <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        </Link>
        <CardDescription className="truncate">
          {`${(product.company as ICompany).name}, ${
            (product.category as ICategory).name
          }`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
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
        <p className="line-clamp-3">{product.shortDescription}</p>
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
