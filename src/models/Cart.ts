import { models, Schema, Types, Document, model } from "mongoose";

export enum CartStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface ICart extends Document {
  user: Types.ObjectId;
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

export const Cart = models?.Cart || model<ICart>("Cart", cartSchema);
export default Cart;