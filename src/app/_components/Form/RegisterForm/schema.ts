import { z } from "zod";

export const schema = z.object({
    username: z.string().min(4, 'O nome precisa ter pelo menos 4 caracteres'),
    email: z.string().email('Email Inválido'),
    password: z
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .max(20, 'A senha não pode passar de 20 caracteres'),
    confirmPassword: z.string().min(8, "As senhas precisam estar iguais!"),
})
.refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "As senhas precisam estar iguais!",
      path: ["confirmPassword"],
    }
  );

  export type schemaProps = z.infer<typeof schema>