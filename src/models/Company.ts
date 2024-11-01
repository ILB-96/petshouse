import { models, Schema, Types, Document, model } from "mongoose";

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  url?: string;
  description?: string;
}
const companySchema = new Schema<ICompany>({
  name: { type: String, required: true, unique: true },
  url: { type: String },
  description: { type: String },
});

export const Company = models?.Company || model<ICompany>("Company", companySchema);
