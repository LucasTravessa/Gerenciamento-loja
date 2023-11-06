import { z } from 'zod'

export const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z
        .string()
        .min(8, 'A senha deve ter no minimo 8 caracteres')
        .max(20, 'A senha não pode passar de 20 caracteres')
});

export type schemaProps = z.infer<typeof schema>