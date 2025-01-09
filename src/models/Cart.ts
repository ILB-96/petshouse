import { models, Schema, Types, Document, model } from "mongoose";
import { IUser } from "./User";
import { IDiscount } from "./Discount";

export enum CartStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ICart extends Document {
  user: Types.ObjectId | string | IUser;
  cartDiscount?: Types.ObjectId | string | IDiscount;
  status: CartStatus;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CartStatus),
      default: CartStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

export const Cart = models?.Cart || model<ICart>("Cart", cartSchema);
export default Cart;