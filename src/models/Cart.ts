import { models, Schema, Types, Document, model } from "mongoose";

export enum CartStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface ICart extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  cartItemId: Types.ObjectId[];
  status: CartStatus;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CartStatus),
      default: CartStatus.ACTIVE,
    },
    cartItemId: [{ type: Schema.Types.ObjectId, ref: "CartItem", default: [] }],
  },
  { timestamps: true }
);

export const Cart = models?.Cart || model<ICart>("Cart", cartSchema);
