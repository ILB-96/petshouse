"use client";
import { findOneProduct } from "@/actions/product";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct } from "@/models/Product";
import { MainContainer, SectionContainer } from "@/styles/style";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const slug = params.product;

      const fetchedProduct = await findOneProduct(slug as string);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params.product, router]);

  if (loading) {
    return (
      <MainContainer className="flex justify-center items-center w-screen h-screen m-auto">
        <SectionContainer className="w-screen flex justify-center items-center h-screen m-auto">
          <Icons.loader className="animate-spin w-10 h-10 text-gray-600" />
        </SectionContainer>
      </MainContainer>
    );
  }

  if (!product) {
    return (
      <MainContainer>
        <SectionContainer className="text-center mt-10">
          <h2 className="text-xl font-bold">Product not found</h2>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Back
          </Button>
        </SectionContainer>
      </MainContainer>
    );
  }
  console.log(product);
  return (
    <MainContainer>
      <SectionContainer className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <Image
              src={product.images?.[0].source || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
            />
            <div className="flex gap-4 overflow-x-auto">
              {product.images?.map((image, index) => (
                <Image
                  key={index}
                  src={image.source}
                  alt={image.caption}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-24 h-24 cursor-pointer border border-gray-200 hover:border-gray-400"
                />
              )) || (
                <Image
                  src="/placeholder.svg"
                  alt="Placeholder"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-24 h-24"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.shortDescription}</p>
            <Separator className="my-4" />
            <div className="text-xl font-bold text-green-600">
              ${product.price}
            </div>
            <Separator className="my-4" />

            {/* Add to Cart Form */}
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-base">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Add to Cart
              </Button>
            </form>
            <Separator className="my-4" />

            {/* Description */}
            <div>
              <h2 className="font-bold text-lg">Description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default ProductPage;
