import { models, Schema, Types, Document, model } from "mongoose";
export interface IProductOptions extends Document {
  groupName: string;
  productsId: Types.ObjectId[];
}

const productOptionsSchema = new Schema<IProductOptions>({
  groupName: { type: String, required: true },
  productsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

export const ProductOptions =
  models?.ProductOptions ||
  model<IProductOptions>("ProductOptions", productOptionsSchema);
export default ProductOptions;