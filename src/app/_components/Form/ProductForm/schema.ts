import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
  price: z.coerce
    .number()
    .min(0.01, "O preço precisa ter pelo menos 1 caracteres"),
  on_stock: z.coerce
    .number()
    .min(0, "O quantidade precisa ter pelo menos 1 caracteres"),
});

export type schemaProps = z.infer<typeof schema>;
