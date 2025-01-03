import { models, Schema, Types, Document, model } from "mongoose";

export interface ICartItem extends Document {
  product: Types.ObjectId;
  cart: Types.ObjectId;
  quantity: number;
  productDiscount?: Types.ObjectId;
  price?: number;
}
const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  quantity: { type: Number, required: true },
  productDiscount: { type: Schema.Types.ObjectId, ref: "ProductDiscount" },
  price: { type: Number },
});

export const CartItem =
  models?.CartItem || model<ICartItem>("CartItem", cartItemSchema);
export default CartItem;