import { IProduct } from "@/models/Product";
import React from "react";
import ProductCard from "./ProductCard";
import { SectionContainer } from "@/styles/style";
import { PopulatedProduct } from "@/types";
interface ProductsListProps {
  products: PopulatedProduct[];
  isFiltered?: boolean;
}
const ProductsList: React.FC<ProductsListProps> = ({
  products,
  isFiltered,
}) => {
  return (
    <SectionContainer>
      {!products.length && (
        <div className="flex justify-center items-center size-full">
          <p className="text-3xl font-semibold text-gray-500">
            {!isFiltered
              ? "We are still working on getting products for this category."
              : "No products found."}
          </p>
        </div>
      )}
      <div className="grid grid-cols-3  max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2 max-sm:mx-auto max-sm:space-y-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProductsList;
