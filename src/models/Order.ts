import { models, Schema, Types, Document, model } from "mongoose";
import { IAddress, addressSchema } from "./Address";

export enum OrderStatus {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
}

export enum PaymentStatus {
  PENDING,
  PAID,
  FAILED,
  REFUNDED,
}

export enum PaymentMethod {
  CREDIT_CARD,
  PAYPAL,
  STRIPE,
  APPLE_PAY,
  GOOGLE_PAY,
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  address: IAddress;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  paymentIntent?: string;
  notes?: string;
  orderItemsId: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      type: addressSchema,
      required: true,
    },
    status: {
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentStatus: {
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      enum: Object.values(PaymentMethod),
      required: true,
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    paymentIntent: { type: String },
    notes: { type: String },
    orderItemsId: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);

export const Order = models?.Order || model<IOrder>("Order", orderSchema);
