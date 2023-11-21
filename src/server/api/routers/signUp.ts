import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hash } from "argon2";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
  name: z.string(),
});

export const signUpRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const exists = await ctx.db.user.findFirst({
        where: { email },
      });

      if (exists) {
        return {
          status: 401,
          message: "Email already exists",
        };
      }

      const hashedPassword = await hash(password);

      const result = await ctx.db.user.create({
        data: { name: name, email: email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
