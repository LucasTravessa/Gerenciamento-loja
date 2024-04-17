import { z } from "zod";

const purchasesDetailsSchema = z.object({
  products_id: z.coerce.number(),
  products_amount: z.coerce.number(),
  price: z.coerce.number(),
});

enum statusProps {
  entrege = "Entrege",
  atrasado = "Atrasado",
  pendente = "Pendente",
  cancelado = "Cancelado",
}

export const schema = z.object({
  supplier_id: z.coerce.number(),
  date: z.coerce.date(),
  total: z.coerce.number(),
  purchace_details: z.array(purchasesDetailsSchema),
  status: z.enum([
    statusProps.entrege,
    statusProps.atrasado,
    statusProps.pendente,
    statusProps.cancelado,
  ]),
});

export type schemaProps = z.infer<typeof schema>;
