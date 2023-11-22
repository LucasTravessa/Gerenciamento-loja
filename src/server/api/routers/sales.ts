import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const salesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.sales.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.sales.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        client: z.string(),
        total: z.number(), 
        date: z.date(),
        employee_id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.sales.create({
        data: {
          client: input.client,
          total: input.total,
          date: input.date,
          employee_id: input.employee_id, 
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  update: publicProcedure
    .input(
      z
        .object({
          id: z.number(),
          client: z.string(),
          total: z.number(), 
          date: z.date(),
        })
        .partial()
        .required({ id: true }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.sales.update({
        where: { id: input.id },
        data: {
          client: input.client,
          total: input.total,
          date: input.date,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});