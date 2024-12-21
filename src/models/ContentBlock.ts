import { models, Schema, Types, Document, model } from "mongoose";

// Enum for BlockWidth
export enum BlockWidth {
  FULL,
  HALF,
  THIRD,
  TWOTHIRDS,
}

// TypeScript Interface for the schema
export type IContentBlock = {
  _id: Types.ObjectId;
  name: string;
  width: BlockWidth;
  order: number;
  content: string;
  productId: Types.ObjectId;
};
// Mongoose Schema for the ContentBlock
export const contentBlockSchema = new Schema<IContentBlock>({
  name: { type: String, default: "Block" },
  width: {
    type: Number, // Explicitly set to Number
    enum: Object.values(BlockWidth).filter(
      (value) => typeof value === "number"
    ), // Filter only the numeric values of the enum
    default: BlockWidth.FULL, // Set the default value
  },
  order: { type: Number, default: 1 },
  content: { type: String, default: "" }, // You missed `content` in your original schema
  productId: { type: Schema.Types.ObjectId, required: true },
});

// Create the model
export const ContentBlock =
  models?.ContentBlock ||
  model<IContentBlock>("ContentBlock", contentBlockSchema);
