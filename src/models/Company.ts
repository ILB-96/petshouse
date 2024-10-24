import { models, Schema, Types, Document, model } from "mongoose";

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  url?: string;
}
const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  url: { type: String },
});

export const Company =
  models?.ICompany || model<ICompany>("Company", companySchema);
