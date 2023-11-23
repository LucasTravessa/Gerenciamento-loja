import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const purchasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.purchases.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.purchases.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        supplier_id: z.number(),
        total: z.number(),
        date: z.date(),
        status: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.purchases.create({
        data: {
            supplier_id: input.supplier_id,
            total: input.total,
            date: input.date,
            status: input.status,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  update: publicProcedure
    .input(
      z
        .object({
            id: z.number(),
            supplier_id: z.number(),
            total: z.number(),
            date: z.date(),
            status: z.string(),
        })
        .partial()
        .required({ id: true }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.purchases.update({
        where: { id: input.id },
        data: {
            supplier_id: input.supplier_id,
            total: input.total,
            date: input.date,
            status: input.status,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});