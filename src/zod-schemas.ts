import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  info: z.string().min(5).max(1000),
});

export const CategorySchema = z.object({
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
  parentSlug: z
    .string()
    .optional()
    .transform((val) => (val ? val.toLowerCase().replace(/\s+/g, "-") : "")),
});

export const companySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20)
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  url: z.string().url(),
});
