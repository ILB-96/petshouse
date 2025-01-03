"use client";
import { IProduct } from "@/models/Product";
import React from "react";
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

const ProductCard: React.FC<IProduct> = ({ product }) => {
  const handleAddToCart = async () => {
    const session = await getSession();
    console.log("session", session);
    if (session?.user) {
      console.log("Adding to cart");
      await createCartItem(product._id, session.user._id, 1);
    } else {
      const cartItem = { product: product._id, quantity: 1 };
      addItemToLocalStorageCart(cartItem);
    }
  };
  return (
    <Card className="max-w-sm overflow-hidden shadow-lg">
      {product.image && (
        <CardContent className="p-0">
          <Image
            src={product.image.source}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 object-cover"
          />
        </CardContent>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{`${product.company.name}, ${product.category.name}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.shortDescription}</p>
      </CardContent>
      <CardFooter className="flex justify-around items-center">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
        <Button variant="outline" asChild>
          <Link href={`/shop/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
