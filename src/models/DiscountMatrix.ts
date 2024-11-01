import { models, Schema, model, Types } from "mongoose";

export interface IProductDiscount {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  description: string;
  discountMatrixId: Types.ObjectId;
  data: string;
  startDate: Date;
  endDate?: Date;
}

export interface IDiscountMatrix {
  _id: Types.ObjectId;
  type: string;
}

export const productDiscountSchema = new Schema<IProductDiscount>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  description: { type: String, required: true },
  discountMatrixId: {
    type: Schema.Types.ObjectId,
    ref: "DiscountMatrix",
    required: true,
  },
  data: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

export const ProductDiscount =
  models?.ProductDiscount ||
  model<IProductDiscount>("Address", productDiscountSchema);
