import { models, Schema, Document, model, Types } from "mongoose";
import { z } from "zod";
export const companySchemaZod = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20)
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(20)
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  url: z.string().url().optional(),
  deletedAt: z.date().optional(),
});

export type ICompany = z.infer<typeof companySchemaZod> &
  Document & { _id: string | Types.ObjectId };

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  url: { type: String },
  deletedAt: { type: Date },
});

const Company = models?.Company || model<ICompany>("Company", companySchema);
export default Company;
