import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(4, "O nome precisa ter pelo menos 4 caracteres"),
  email: z.string().email("Este email não é válido"),
  role: z.string().min(4, "O cargo precisa ter pelo menos 4 caracteres"),
  phone_number: z
    .string()
    .min(8, "O telefone precisa ter pelo menos 8 caracteres")
    .refine((data) => !/[a-z A-Z]+/.test(data), {
      message: "Número de telefone inválido",
    }),
  salary: z.coerce.number().min(1, "Digite um salario válido"),
  address: z.string().min(6, "Digite um endreço válido"),
  status: z.string(),
  img: z.string().optional(),
});

export type schemaProps = z.infer<typeof schema>;
