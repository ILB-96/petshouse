"use client";
import { createCartItem } from "@/actions/cart-item";
import { findDiscountsByProduct } from "@/actions/discount";
import { findOneProduct } from "@/actions/product";
import { Icons } from "@/components/icons";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addItemToLocalStorageCart } from "@/lib/cartStorage";
import { IDiscount } from "@/models/Discount";
import { IProduct } from "@/models/Product";
import { MainContainer, SectionContainer } from "@/styles/style";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [setDiscount] = useState<IDiscount>();
  const [price, setPrice] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // For button loading state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Track selected quantity
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const slug = params.product;
      const fetchedProduct = await findOneProduct(slug as string);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        const response = await findDiscountsByProduct(
          fetchedProduct._id,
          fetchedProduct.company._id,
          fetchedProduct.category,
          fetchedProduct.price
        );
        let price = fetchedProduct.price;
        if (response?.highestValue) {
          price -= response.highestValue;
        }
        setPrice(price);
        if (response?.buyXgetYDiscount) {
          setDiscount(response?.buyXgetYDiscount);
        }
      }
      setLoading(false);
    };
    const fetchDiscounts = async () => {};
    fetchDiscounts();

    fetchProduct();
  }, [params.product, router]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true); // Start loading
    const session = await getSession();
    try {
      if (session?.user) {
        await createCartItem(product._id, session.user._id, quantity);
      } else {
        const cartItem = { product: product._id, quantity };
        addItemToLocalStorageCart(cartItem);
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(false); // Stop loading
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <MainContainer>
        <SectionContainer className="text-center mt-10">
          <h2 className="text-xl font-bold">Product not found</h2>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </SectionContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <SectionContainer className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <Image
              src={
                product.images?.[activeImageIndex].source || "/placeholder.svg"
              }
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
            />
            <div className="flex gap-4 overflow-x-auto">
              {product.images?.map((image, index) => (
                <Button
                  key={image.source}
                  asChild
                  size="icon"
                  className={
                    index === activeImageIndex
                      ? "border-double border-red-500 border-4"
                      : ""
                  }
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image.source}
                    alt={image.caption}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-24 h-24 cursor-pointer border border-gray-200 hover:border-gray-400"
                  />
                </Button>
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

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.shortDescription}</p>
            <Separator className="my-4" />
            <p className="text-xl font-semibold text-gray-800">
              {price && price < product.price ? (
                <>
                  <span className="line-through text-red-500">{`$${product.price.toFixed(
                    2
                  )}`}</span>
                  <span className="ml-2 font-bold">{`$${price.toFixed(
                    2
                  )}`}</span>
                </>
              ) : (
                `$${product.price.toFixed(2)}`
              )}
            </p>
            <Separator className="my-4" />

            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-base">
                  Quantity
                </Label>
                <Select
                  value={quantity.toString()}
                  onValueChange={(value) => setQuantity(Number(value))}
                >
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
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <Icons.loader className="animate-spin w-5 h-5" />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </form>
            <Separator className="my-4" />
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger
                  disabled={product.ingredients === undefined}
                  value="ingredients"
                >
                  Ingredients
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </TabsContent>
              <TabsContent value="ingredients">
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{
                    __html: product?.ingredients || "",
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default ProductPage;
