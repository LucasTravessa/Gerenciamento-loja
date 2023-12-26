import { z } from "zod";

const salesDetailSchema = z.object({
  products_id: z.coerce.number(),
  products_amount: z.coerce.number(),
  price: z.coerce.number(),
});

export const schema = z.object({
  client: z.string().min(4, "O nome precisa ter pelo menos 4 caracteres"),
  total: z.coerce.number(),
  date: z.coerce.date(),
  employee_id: z.coerce.number(),
  sales_details: z.array(salesDetailSchema),
});

export type schemaProps = z.infer<typeof schema>;
