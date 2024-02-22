import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const purchaceDetailSchema = z.object({
  products_name: z.string(),
  products_amount: z.number(),
  price: z.number(),
});

const purchaseSchema = z.object({
  id: z.number(),
  supplier_id: z.number(),
  total: z.number(),
  date: z.date(),
  status: z.string(),
  purchace_details: z.array(purchaceDetailSchema),
});

export const purchasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.purchases.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.purchases.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(purchaseSchema.omit({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.db.purchases.create({
        data: {
          supplier_id: input.supplier_id,
          total: input.total,
          date: input.date,
          status: input.status,
          purchace_details: input.purchace_details,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.purchases.delete({ where: { id: input.id } }),
    ),
  update: publicProcedure
    .input(purchaseSchema.partial().required({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.db.purchases.update({
        where: { id: input.id },
        data: {
          supplier_id: input.supplier_id,
          total: input.total,
          date: input.date,
          status: input.status,
          purchace_details: input.purchace_details,
        },
      });
    }),
});
