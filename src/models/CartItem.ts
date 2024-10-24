import { models, Schema, Types, Document, model } from "mongoose";

export interface ICartItem extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  cartId: Types.ObjectId;
}
const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
});

export const CartItem =
  models?.ICartItem || model<ICartItem>("CartItem", cartItemSchema);
