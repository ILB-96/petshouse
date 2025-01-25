import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { calculateTotal } from "@/lib/cart";
import { PopulatedCartItem } from "@/types";


const CartSummaryCard = ({ cartItems }: { cartItems: PopulatedCartItem[] }) => {
  const total = calculateTotal(cartItems);
  return (
    <Card className="w-64 h-72 place-self-end mr-3">
      <CardHeader className="text-2xl font-semibold">Summary</CardHeader>
      <CardContent className="grid grid-cols-2 items-start">
        <h3>Subtotal</h3>
        <p className="text-right">{total.toFixed(2)}$</p>
        <h3>Shipping</h3>
        <p className="text-right">11$</p>
        <h3>Tax</h3>
        <p className="text-right">0$</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 items-start text-xl">
        <h3 className="font-semibold">Total</h3>
        <p className="text-right font-semibold">{(total + 11).toFixed(2)}$</p>
      </CardFooter>
      <div className="w-full flex justify-center">
        <Button
          disabled={cartItems.length === 0}
          className="w-4/5 justify-center font-bold text-xl"
          asChild={cartItems.length !== 0}
        >
          {cartItems.length !== 0 ? (
            <Link href="/checkout">Checkout</Link>
          ) : (
            "Cart is empty"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CartSummaryCard;
