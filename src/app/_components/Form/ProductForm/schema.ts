import { z } from "zod";

export const schema = z.object({
    name: z.string().min(4, 'O nome precisa ter pelo menos 4 caracteres'),
    price: z.string()
    .min(1, 'O preço precisa ter pelo menos 1 caracteres')
    .refine((data) => !/[a-z A-Z]+/.test(data),
    {message: 'preço inválido'}
    ),
    on_stock: z.string()
    .min(1, 'O quantidade precisa ter pelo menos 1 caracteres')
    .refine((data) => !/[a-z A-Z]+/.test(data),
    {message: 'quantidade inválido'}
    ),
});

export type schemaProps = z.infer<typeof schema>