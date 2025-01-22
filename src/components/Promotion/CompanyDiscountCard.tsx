import { findProductsByCompany } from "@/actions/product";
import React, { useEffect, useState } from "react";
import GenericDiscountCard from "./GenericDiscountCard";
import { PopulatedProductDiscount } from "@/types";

const CompanyDiscountCard: React.FC<{
  discount: PopulatedProductDiscount;
}> = ({ discount }) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await findProductsByCompany(
        discount.company as string,
        3
      );
      setProducts(products);
    };
    fetchProducts();
  }, [discount.company]);
  return <GenericDiscountCard discount={discount} products={products} />;
};

export default CompanyDiscountCard;
