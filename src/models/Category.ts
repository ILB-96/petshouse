import { models, Schema, Types, Document, model } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  parent?: string;
  isDraft?: boolean;
}
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: String },
  isDraft: { type: Boolean, required: true },
});

export const Category =
  models?.Category || model<ICategory>("Category", categorySchema);
