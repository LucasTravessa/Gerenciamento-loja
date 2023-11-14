import { z } from "zod";

export const schema = z.object({
    name: z.string().min(4, 'O nome precisa ter pelo menos 4 caracteres'),
    email: z.string().email('Este email não é válido'),
    job: z.string().min(4, 'O cargo precisa ter pelo menos 4 caracteres'),
    phone: z.string().min(4, 'O telefone precisa ter pelo menos 4 caracteres'), 
})

export type schemaProps = z.infer<typeof schema>