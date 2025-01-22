import {
  findProductsByCategory,
  findProductsByCompany,
  getFilteredProducts,
} from "@/actions/product";
import React, { useEffect, useState } from "react";
import GenericDiscountCard from "./GenericDiscountCard";
import { PopulatedCategoryDiscount, PopulatedProduct } from "@/types";
import { getCategoryTree } from "@/actions/category";

const CategoryDiscountCard: React.FC<{
  discount: PopulatedCategoryDiscount;
}> = ({ discount }) => {
  const [products, setProducts] = useState<PopulatedProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const categories = await getCategoryTree(discount.category.slug);
      const products = await findProductsByCategory(categories, 3);
      setProducts(products);
    };
    fetchProducts();
  }, [discount.category]);
  return <GenericDiscountCard discount={discount} products={products} />;
};

export default CategoryDiscountCard;
