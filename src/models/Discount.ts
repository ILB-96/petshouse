import { models, Schema, model, Document } from "mongoose";
import { z } from "zod";
import { Types } from "mongoose";
// ** Zod Schema for Validation **
export const discountSchemaZod = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .transform(
      (val) => val.trim().charAt(0).toUpperCase() + val.trim().slice(1)
    ),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  description: z.string().max(300).optional(),
  code: z
    .string()
    .max(20)
    .optional()
    .transform((val) => val?.toUpperCase()),
  type: z
    .enum([
      "cartDiscount",
      "productDiscount",
      "categoryDiscount",
      "companyDiscount",
      "freeShipping",
      "buyXGetY",
    ])
    .optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  minSubtotal: z.number().nonnegative().optional(),
  product: z.union([z.string(), z.instanceof(Types.ObjectId)]).optional(),
  getProduct: z.union([z.string(), z.instanceof(Types.ObjectId)]).optional(),
  category: z.union([z.string(), z.instanceof(Types.ObjectId)]).optional(),
  company: z.union([z.string(), z.instanceof(Types.ObjectId)]).optional(),
  maxUsage: z.number().int().nonnegative().optional(),
  discountPercentage: z
    .number()
    .min(0, "Discount percentage must be positive")
    .max(100, "Discount percentage cannot exceed 100")
    .optional(),
  discountAmount: z.number().nonnegative().optional(),
  buyX: z.number().int().nonnegative().optional(),
  getY: z.number().int().nonnegative().optional(),
});

// Infer the Zod schema for TypeScript type safety
export type IDiscount = z.infer<typeof discountSchemaZod> &
  Document & { _id: string | Types.ObjectId };

// ** Mongoose Schema for Database **
export const discountSchema = new Schema<IDiscount>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    code: { type: String, unique: true, sparse: true },
    type: {
      type: String,
      enum: [
        "cartDiscount",
        "buyXGetY",
        "freeShipping",
        "productDiscount",
        "categoryDiscount",
        "companyDiscount",
      ],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    minSubtotal: { type: Number, min: 0 },
    category: { type: String, ref: "Category" },
    company: { type: String, ref: "Company" },
    product: { type: String, ref: "Product" },
    maxUsage: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100 },
    discountAmount: { type: Number, min: 0 },
    freeShipping: { type: Boolean },
    buyX: { type: Number, min: 0 },
    getProduct: { type: String, ref: "Product" },
    getY: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Discount =
  models?.Discount || model<IDiscount>("Discount", discountSchema);

export default Discount;
