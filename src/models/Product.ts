import { models, Schema, Types, Document, model } from "mongoose";

import { z } from "zod";
export const productSchemaZod = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20)
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50)
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50)
    .transform((val) => val.toUpperCase().replace(/\s+/g, "-")),
  price: z.coerce.number().min(1, "Price is required").int(),
  stock: z.coerce.number().min(0, "Stock is required").int(),
  images: z.array(z.string()).optional(),
  shortDescription: z.string().min(1, "Short Description is required").max(50),
  company: z.string().min(1, "Company is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().optional(),
  expiredAt: z.date().optional(),
});
export type IProduct = z.infer<typeof productSchemaZod> & Document;

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [
      {
        type: Schema.Types.String,
        ref: "Media",
      },
    ],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {
      type: Schema.Types.String,
      ref: "Category",
      required: true,
    },
    company: { type: Schema.Types.String, ref: "Company", required: true },
    description: { type: String, required: true },
    ingredients: { type: String },
    expiredAt: { type: Date },
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);
export default Product;
