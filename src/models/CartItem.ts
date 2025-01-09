import { models, Schema, Types, Document, model } from "mongoose";
import { IProduct } from "./Product";
import { IDiscount } from "./Discount";
import { ICart } from "./Cart";

export interface ICartItem extends Document {
  product: Types.ObjectId | string | IProduct;
  cart: Types.ObjectId | string | ICart;
  quantity: number;
  productDiscount?: Types.ObjectId | string | IDiscount;
  price?: number;
}
const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  quantity: { type: Number, required: true },
  productDiscount: { type: Schema.Types.ObjectId, ref: "ProductDiscount" },
  price: { type: Number },
});
cartItemSchema.index({ cart: 1 });
const CartItem =
  models?.CartItem || model<ICartItem>("CartItem", cartItemSchema);
export default CartItem;