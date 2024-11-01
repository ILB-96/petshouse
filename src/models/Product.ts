import { models, Schema, Types, Document, model } from "mongoose";
import { contentBlockSchema, IContentBlock } from "./ContentBlock";
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  sku: string;
  description: string;
  images: { url: string; caption: string }[];
  price: number;
  stock: number;
  categoryId: Types.ObjectId;
  companyId: Types.ObjectId;
  contentBlocks: IContentBlock[];
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ url: { type: String }, caption: { type: String } }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    contentBlocks: [contentBlockSchema],
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);
export default Product;
