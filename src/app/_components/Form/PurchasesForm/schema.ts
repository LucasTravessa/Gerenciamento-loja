import { z } from "zod";

enum statusProps {
  entrege = "Entrege",
  atrasada = "Atrasada",
  pendente = "Pendente",
  cancelada = "Cancelada",
}

export const schema = z.object({
  product_name: z.string().min(4, "O nome precisa ter pelo menos 4 caracteres"),
  date: z.coerce.date(),
  status: z.enum([
    statusProps.entrege,
    statusProps.atrasada,
    statusProps.pendente,
    statusProps.cancelada,
  ]),
});

export type schemaProps = z.infer<typeof schema>;
