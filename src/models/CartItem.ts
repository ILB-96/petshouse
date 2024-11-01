import { models, Schema, Types, Document, model } from "mongoose";

export interface ICartItem extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  cartId: Types.ObjectId;
  productDiscountId?: Types.ObjectId;
  quantity: number;
  price?: number;
}
const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  quantity: { type: Number, required: true },
  productDiscountId: { type: Schema.Types.ObjectId, ref: "ProductDiscount" },
  price: { type: Number },
});

export const CartItem =
  models?.CartItem || model<ICartItem>("CartItem", cartItemSchema);
