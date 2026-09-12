import { z } from "zod";

export const orderSchema = z.object({
  grade: z.string().min(1, "Please select an oil type"),

  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((value) => {
      const quantity = Number(value);
      return Number.isFinite(quantity) && quantity > 0;
    }, "Quantity must be greater than 0"),

  date: z.string().min(1, "Date is required"),

  address: z
    .string()
    .trim()
    .min(1, "Destination address is required")
    .min(10, "Please enter a complete destination address"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
