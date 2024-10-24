import { models, Schema, Types, Document, model } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  path?: Types.ObjectId[];
}
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  path: [{ type: String, default: [] }],
});

export const Category =
  models?.ICategory || model<ICategory>("Category", categorySchema);
