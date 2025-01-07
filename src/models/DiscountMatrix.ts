import { models, Schema, model, Types } from "mongoose";

export interface IDiscount {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  description: string;
  data: any; // Stores specific discount rules
  startDate: Date;
  endDate?: Date;
}
export const discountSchema = new Schema<IDiscount>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  description: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

// Add index for efficient querying
discountSchema.index({ product: 1, startDate: 1 });

export const Discount =
  models?.Discount || model<IDiscount>("Discount", discountSchema);
