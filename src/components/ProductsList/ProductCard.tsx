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

const ProductCard: React.FC<IProduct> = ({ product }) => {
  const handleViewDetails = () => {};
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
        <Button>Add To Cart</Button>
        <Button variant="outline" asChild>
          <Link href={`/shop/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
