import { models, Schema, Types, Document, model } from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  STRIPE = "STRIPE",
  APPLE_PAY = "APPLE_PAY",
  GOOGLE_PAY = "GOOGLE_PAY",
}
import { z } from "zod";
export const OrderSchemaZod = z.object({
  user: z.union([
    z.string().min(1, "User is required"),
    z.instanceof(Types.ObjectId),
  ]),
  fullname: z
    .string()
    .min(1, "Name is required")
    .max(200)
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "street is required"),
  house: z.string().optional(),
  floor: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().min(9, "Phone is required").max(15),
  subtotal: z.coerce.number().min(0, "Subtotal is required"),
  shipping: z.coerce.number().min(0, "Shipping is required"),
  tax: z.coerce.number().min(0, "Tax is required"),
  paymentMethod: z.string().min(1, "Payment Method is required"),
  paymentStatus: z.string().min(1, "Payment Method is required"),
  paymentIntent: z.string().optional(),
  cart: z.union([
    z.string().min(1, "Cart is required"),
    z.instanceof(Types.ObjectId),
  ]),
  status: z.string().min(1, "Status is required"),
  notes: z.string().max(300).optional(),
});

export type IOrder = z.infer<typeof OrderSchemaZod> &
  Document & { _id: string | Types.ObjectId };

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.String, ref: "User", required: true },
    fullname: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String },
    floor: { type: String },
    zip: { type: String },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    paymentIntent: { type: String },
    notes: { type: String },
    cart: { type: Schema.Types.String, ref: "Cart", required: true },
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);
export default Order;
