import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hash } from "argon2";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

const signUpSchema = loginSchema.extend({
  name: z.string(),
});

export const signUpRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const { name, email, password } = input;

      // const exists = await ctx.db.user.findFirst({
      //   where: { email },
      // });

      // if (exists) {
      //   return {
      //     status: 401,
      //     message: "Email already exists",
      //   };
      // }

      // const hashedPassword = await hash(password);

      // const result = await ctx.db.user.create({
      //   data: { name: name, email: email, password: hashedPassword },
      // });

      return ctx.db.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
    }),
});
