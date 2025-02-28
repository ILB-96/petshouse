import { models, Schema, Types, Document, model } from "mongoose";
export interface IRelatedProducts extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  relatedProductId: Types.ObjectId;
}

const relatedProductsSchema = new Schema<IRelatedProducts>({
  productId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  relatedProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const RelatedProducts =
  models?.RelatedProducts ||
  model<IRelatedProducts>("RelatedProducts", relatedProductsSchema);

export default RelatedProducts;