import { models, Schema, Types, Document, model } from "mongoose";
export interface IRelatedProduct extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  relatedProductId: Types.ObjectId;
}

const relatedProductsSchema = new Schema<IRelatedProduct>({
  productId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  relatedProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export const RelatedProducts =
  models?.RelatedProducts ||
  model<IRelatedProduct>("RelatedProduct", relatedProductsSchema);
