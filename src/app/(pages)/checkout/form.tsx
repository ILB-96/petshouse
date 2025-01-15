"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createOrder } from "@/actions/orders";
import { IOrder } from "@/models/Order";

interface CheckoutFormProps {
  userId: string;
  cartId: string;
  subtotal: string;
}

const CheckoutForm = ({ userId, cartId, subtotal }: CheckoutFormProps) => {
  const [loading, setLoading] = useState(false);

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: {},
    setValue,
  } = useForm();

  // Form submission handler
  const onSubmit = async (formData: unknown) => {
    const data = formData as IOrder;
    setLoading(true);

    const orderData: IOrder = {
      user: userId,
      fullName: data.fullName,
      country: data.country,
      city: data.city,
      street: data.street,
      house: data.house,
      floor: data.floor,
      zip: data.zip,
      phone: data.phone,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: data.paymentMethod,
      subtotal: parseFloat(subtotal),
      tax: 0,
      shipping: 11,
      paymentIntent: undefined,
      notes: data.notes,
      cart: cartId,
    };

    await createOrder(orderData);
    setLoading(false);
    alert("Order placed successfully!");
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={loading ? "opacity-50" : ""}
      >
        {/* Shipping Address Section */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                {...register("fullName", { required: "Full Name is required" })}
                placeholder="Full Name"
                aria-label="Full Name"
              />
              <Input
                {...register("phone", { required: "Phone Number is required" })}
                placeholder="Phone Number"
                aria-label="Phone Number"
              />
              <Input
                {...register("street", { required: "Street is required" })}
                placeholder="Street"
                aria-label="Street"
              />
              <div className="grid gap-4 grid-cols-3">
                <Input
                  {...register("house")}
                  placeholder="House"
                  aria-label="House"
                />
                <Input
                  {...register("floor")}
                  placeholder="Floor"
                  aria-label="Floor"
                />
                <Input
                  {...register("zip")}
                  placeholder="ZIP Code"
                  aria-label="ZIP Code"
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <Input
                  {...register("city", { required: "City is required" })}
                  placeholder="City"
                  aria-label="City"
                />
                <CountryDropdown
                  placeholder="Select country"
                  defaultValue="Israel"
                  onChange={(val) => setValue("country", val.name)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <select
                {...register("paymentMethod", {
                  required: "Payment Method is required",
                })}
                className="w-full border rounded p-2"
              >
                <option value="">Select Payment Method</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="PAYPAL">PayPal</option>
                <option value="STRIPE">Stripe</option>
                <option value="APPLE_PAY">Apple Pay</option>
                <option value="GOOGLE_PAY">Google Pay</option>
              </select>
              <Input
                {...register("cardHolderName", {
                  required: "Card Holder Name is required",
                })}
                placeholder="Card Holder Name"
                aria-label="Card Holder Name"
              />
              <Input
                {...register("cardNumber", {
                  required: "Card Number is required",
                  pattern: {
                    value: /^\d{13,16}$/,
                    message: "Invalid Card Number",
                  },
                })}
                placeholder="Card Number"
                aria-label="Card Number"
                type="text"
              />
              <div className="grid gap-4 grid-cols-2">
                <Input
                  {...register("expiryDate", {
                    required: "Expiry Date is required",
                    pattern: {
                      value: /^\d{2}\/\d{2}$/,
                      message: "Invalid Expiry Date",
                    },
                  })}
                  placeholder="MM/YY"
                  aria-label="Expiry Date"
                  type="text"
                />
                <Input
                  {...register("cvc", {
                    required: "CVC is required",
                    pattern: { value: /^\d{3,4}$/, message: "Invalid CVC" },
                  })}
                  placeholder="CVC"
                  aria-label="CVC"
                  type="password"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              {...register("notes")}
              placeholder="Add any additional notes about your order..."
              className="w-full border rounded p-2"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full mt-6" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
