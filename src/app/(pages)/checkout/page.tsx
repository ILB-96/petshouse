import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MainContainer, SectionContainer } from "@/styles/style";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findCartItems } from "@/actions/cart-item";
import { Icons } from "@/components/icons";
import { calculateTotal } from "@/lib/cart";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "./form";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

const CheckoutPage = async () => {
  const session = await getServerSession(authOptions);
  const { userId, cart, items } = await findCartItems(
    session?.user?.email || ""
  );
  const subtotal = calculateTotal(items);

  return (
    <MainContainer className="">
      <SectionContainer>
        <header className="border-b px-6 py-4 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Icons.package2icon className="h-6 w-6" />
            <span>Petshouse Inc</span>
          </Link>
        </header>
        <div>
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <CheckoutForm
                userId={userId.toString()}
                cartId={cart._id.toString()}
                subtotal={subtotal}
              />
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {items.map(
                      (item: {
                        _id: { toString: () => Key | null | undefined };
                        product: {
                          name:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<unknown>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          newPrice: number;
                        };
                        quantity:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<unknown>
                            >
                          | Iterable<ReactNode>
                          | Promise<AwaitedReactNode>
                          | null
                          | undefined;
                      }) => {
                        return (
                          <div
                            key={item._id.toString()}
                            className="grid grid-cols-3 "
                          >
                            <span>{item.product.name}</span>
                            <span className="mx-auto">{item.quantity}</span>
                            <span className="ml-auto">
                              $
                              {(item.quantity as number) *
                                item.product.newPrice}
                            </span>
                          </div>
                        );
                      }
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$11</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${subtotal + 11}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default CheckoutPage;
