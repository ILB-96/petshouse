import { models, Schema, Document, model, Types } from "mongoose";
import { z } from "zod";

// Define Zod validation schema
export const categorySchemaZod = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  parent: z
    .string()
    .optional()
    .transform((val) => (val ? val.toLowerCase().replace(/\s+/g, "-") : "")),
  isDraft: z.boolean(),
  deletedAt: z.date().optional(),
});

export type ICategory = z.infer<typeof categorySchemaZod> &
  Document & { _id: string | Types.ObjectId };

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: String },
  isDraft: { type: Boolean, required: false },
  deletedAt: { type: Date },
});

const Category =
  models?.Category || model<ICategory>("Category", categorySchema);
export default Category;
