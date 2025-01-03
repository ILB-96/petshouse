import { models, Schema, Document, model } from "mongoose";
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

// TypeScript type based on Zod schema
export type ICategory = z.infer<typeof categorySchemaZod> & Document;

// Define Mongoose schema
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: String },
  isDraft: { type: Boolean, required: false },
  deletedAt: { type: Date },
});

export const Category =
  models?.Category || model<ICategory>("Category", categorySchema);

// Example usage of Zod validation
export const validateCategory = (data: unknown) => {
  const result = categorySchemaZod.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.message}`);
  }
  return result.data;
};
