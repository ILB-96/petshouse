import { IProduct } from "@/models/Product";
import React from "react";
import ProductCard from "./ProductCard";
import { SectionContainer } from "@/styles/style";
interface ProductsListProps {
  products: IProduct[];
  count: number;
}
const ProductsList: React.FC<ProductsListProps> = ({ products, count }) => {
  return (
    <SectionContainer>
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProductsList;
