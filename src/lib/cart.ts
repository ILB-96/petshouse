export const calculateTotal = (items: Item[]): number => {
  let sum = 0;
  items.forEach((item) => {
    sum += item.quantity * item.product.price;
  });
  return sum;
};
