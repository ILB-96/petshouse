import { models, Schema, Types, Document, model } from "mongoose";

export enum BlockWidth {
  FULL,
  HALF,
  THIRD,
  TWOTHIRDS,
}
export type IContentBlock = {
  _id: Types.ObjectId;
  name: string;
  width: BlockWidth;
  order: number;
  content: string;
  productId: Types.ObjectId;
};

export const contentBlockSchema = new Schema<IContentBlock>({
  name: { type: String, default: "Block" },
  width: { enum: Object.values(BlockWidth), default: BlockWidth.FULL },
  order: { type: Number, default: 1 },
  productId: { type: Schema.Types.ObjectId, required: true },
});

export const ContentBlock =
  models?.ContentBlock ||
  model<IContentBlock>("ContentBlock", contentBlockSchema);
