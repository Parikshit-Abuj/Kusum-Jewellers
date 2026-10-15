import { z } from "zod";
export const catalogQuerySchema = z
  .object({
    q: z.string().trim().max(100).default(""),
    category: z.string().max(120).default(""),
    purity: z.string().trim().max(80).default(""),
    metal: z.enum(["", "gold", "silver", "other"]).default(""),
    availability: z.enum(["", "available", "unavailable"]).default(""),
    sort: z.enum(["newest", "name", "price-asc", "price-desc"]).default("newest"),
    page: z.coerce.number().int().min(1).max(10000).default(1),
    min: z
      .string()
      .regex(/^\d{0,10}(\.\d{1,2})?$/)
      .default(""),
    max: z
      .string()
      .regex(/^\d{0,10}(\.\d{1,2})?$/)
      .default(""),
  })
  .refine((v) => !v.min || !v.max || Number(v.min) <= Number(v.max), {
    message: "Minimum price cannot exceed maximum price.",
    path: ["min"],
  });
export type CatalogQuery = z.infer<typeof catalogQuerySchema>;
