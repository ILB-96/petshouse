import React from "react";
import { Card, CardHeader, CardContent, Button } from "@/components/ui";
import { Icons } from "@/components/icons";

const CartItemCard = ({ item }: { item: any }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">{item.name}</h3>
      </CardHeader>
      <CardContent>
        <p>Quantity: {item.quantity}</p>
        <Button variant="outline" size="sm" className="mt-2">
          <Icons.cart className="mr-2" />
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
