import { z } from "zod";

export const schema = z.object({
    name: z.string().min(4, 'O nome precisa ter pelo menos 4 caracteres'),
    email: z.string().email('Este email não é válido'),
    role: z.string().min(4, 'O cargo precisa ter pelo menos 4 caracteres'),
    phone: z.string()
    .min(8, 'O telefone precisa ter pelo menos 8 caracteres')
    .refine((data) => !/[a-z A-Z]+/.test(data),
    {message: 'Número de telefone inválido'}
    ),
    salary: z.string().min(1, 'Digite um salario válido')
    .refine((data) => !/[a-z A-Z]+/.test(data),
    {message: 'Digite um salario válido'}
    ),
    address: z.string().min(6, 'Digite um endreço válido')
})

export type schemaProps = z.infer<typeof schema>