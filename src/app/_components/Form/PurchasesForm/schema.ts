import { z } from "zod";

const purchasesDetailsSchema = z.object({
  products_name: z.coerce.string(),
  products_amount: z.coerce.number(),
  price: z.coerce.number(),
});

enum statusProps {
  entrege = "Entrege",
  atrasada = "Atrasada",
  pendente = "Pendente",
  cancelada = "Cancelada",
}

export const schema = z.object({
  supplier_id: z.coerce.number(),
  date: z.coerce.date(),
  total: z.coerce.number(),
  purchace_details: z.array(purchasesDetailsSchema),
  status: z.enum([
    statusProps.entrege,
    statusProps.atrasada,
    statusProps.pendente,
    statusProps.cancelada,
  ]),
});

export type schemaProps = z.infer<typeof schema>;
