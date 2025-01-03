import { Button } from "../ui/button";
import CartItemCard from "./CartItemCard";

const CartList = ({ cartItems, handleAddToCart }: any) => {
  return (
    <div className="p-4">
      {cartItems.map((item: any) => (
        <CartItemCard key={item.product} item={item} />
      ))}
      <Button onClick={() => handleAddToCart(someProduct)}>
        Add More Items
      </Button>
    </div>
  );
};

export default CartList;
