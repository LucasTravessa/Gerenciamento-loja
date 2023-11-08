import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.employees.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.employees.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        address: z.string(),
        phone_number: z.string(),
        role: z.string(),
        salary: z.number(),
        status: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.employees.create({
        data: {
          name: input.name,
          email: input.email,
          address: input.address,
          phone_number: input.phone_number,
          role: input.role,
          salary: input.salary,
          status: input.status,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
