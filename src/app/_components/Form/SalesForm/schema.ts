import { z } from "zod";

const salesDetailSchema = z.object({
  products_id: z.string(),
  products_amount: z.string(),
  price: z.string(),
});

export const schema = z.object({
  client: z.string().min(4, "O nome precisa ter pelo menos 4 caracteres"),
  total: z.string(),
  date: z.string(),
  employee_id: z.string(),
  sales_details: z.array(salesDetailSchema),
});

export type schemaProps = z.infer<typeof schema>;
