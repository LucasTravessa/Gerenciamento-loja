/* eslint-disable @typescript-eslint/no-misused-promises */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const salesDetailSchema = z.object({
  products_id: z.number(),
  products_amount: z.number(),
  price: z.number(),
});

const salesSchema = z.object({
  id: z.number(),
  client: z.string(),
  total: z.number(),
  date: z.date(),
  employee_id: z.number(),
  sale_details: z.array(salesDetailSchema),
});

export const salesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.sales.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.sales.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(salesSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const purchase = await ctx.db.sales.create({
        data: {
          client: input.client,
          total: input.total,
          date: input.date,
          employee_id: input.employee_id,
          sale_details: input.sale_details,
        },
      });

      input.sale_details.forEach(async (products) => {
        const product = await ctx.db.products.findUnique({
          where: { id: products.products_id },
        });

        if (product) {
          const result = await ctx.db.products.update({
            where: { id: products.products_id },
            data: {
              price: products.price,
              on_stock: product.on_stock - products.products_amount,
            },
          });
        }
      });

      return {
        status: 201,
        message: "Account created successfully",
      };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.sales.delete({ where: { id: input.id } }),
    ),
  update: publicProcedure
    .input(salesSchema.partial().required({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.db.sales.update({
        where: { id: input.id },
        data: {
          client: input.client,
          total: input.total,
          date: input.date,
          employee_id: input.employee_id,
          sale_details: input.sale_details,
        },
      });
    }),
});
