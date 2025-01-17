import { PopulatedCartItem } from "@/types";

export const calculateTotal = (items: PopulatedCartItem[]): number => {
  let sum = 0;
  items.forEach((item) => {
    if (item.product.newPrice) {
      sum += item.quantity * item.product.newPrice;
    }
  });
  return sum;
};
