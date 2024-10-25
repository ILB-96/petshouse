import { models, Schema, Types, Document, model } from "mongoose";

interface ICart extends Document {
  _id: string;
  userId: Types.ObjectId;
  cartItemId: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    cartItemId: [{ type: Types.ObjectId, ref: "CartItem", default: [] }],
  },
  { timestamps: true }
);

export const Cart = models?.Cart || model<ICart>("Cart", cartSchema);
