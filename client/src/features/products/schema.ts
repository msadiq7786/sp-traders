import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must not exceed 50 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Product code must be at least 2 characters")
    .max(30, "Product code must not exceed 30 characters")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Code can only contain letters, numbers, _ and -",
    ),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
