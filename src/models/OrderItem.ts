import { models, Schema, Types, Document, model } from "mongoose";
export interface IOrderItem extends Document {
  _id: Types.ObjectId;
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

const orderItemSchema = new Schema<IOrderItem>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const OrderItem =
  models?.IOrderItem || model<IOrderItem>("OrderItem", orderItemSchema);
