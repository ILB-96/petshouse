import CartItemCard from "./CartItemCard";

const CartList = ({ cartItems }: any) => {
  return (
    <div className="p-4">
      {cartItems.map((item: any) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
