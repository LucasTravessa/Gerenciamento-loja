import { z } from "zod";

enum statusProps {
  ativo = "Ativo",
  inativo = "Inativo",
  ferias = "Férias",
}

export const schema = z.object({
  fantasy_name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
  cnpj: z
    .string()
    .min(4, "O CNPJ precisa ter pelo menos 4 caracteres")
    .refine((data) => !/[a-z A-Z]+/.test(data), { message: "CPNJ inválido" }),
  email: z.string().email("Este email não é válido"),
  address: z.string().min(4, "Digite um endreço válido"),
  phone_number: z
    .string()
    .min(8, "O telefone precisa ter pelo menos 8 caracteres"),
  // .refine((data) => !/[a-z A-Z]+/.test(data), {
  //   message: "Número de telefone inválido",
  // }),
  status: z.nativeEnum(statusProps),
});

export type schemaProps = z.infer<typeof schema>;
