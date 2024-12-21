import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  info: z.string().min(5).max(1000),
});

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
});

export type companyType = z.infer<typeof companySchema>;