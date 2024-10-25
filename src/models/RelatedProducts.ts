import { models, Schema, Types, Document, model } from "mongoose";
export interface IRelatedProduct extends Document {
  _id: Types.ObjectId;
  firstProductID: Types.ObjectId;
  secondProductId: Types.ObjectId;
}

const relatedProductsSchema = new Schema<IRelatedProduct>({
  firstProductID: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  secondProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export const OrderItem =
  models?.OrderItem ||
  model<IRelatedProduct>("OrderItem", relatedProductsSchema);
