/* eslint-disable @typescript-eslint/no-misused-promises */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const purchaceDetailSchema = z.object({
  products_id: z.number(),
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
    .mutation(async ({ ctx, input }) => {
      if (input.status === "Entrege") {
        const purchases = await ctx.db.purchases.create({
          data: {
            supplier_id: input.supplier_id,
            total: input.total,
            date: input.date,
            status: input.status,
            purchace_details: input.purchace_details,
          },
        });
        input.purchace_details.forEach(async (products) => {
          const product = await ctx.db.products.findUnique({
            where: { id: products.products_id },
          });

          if (product) {
            const result = await ctx.db.products.update({
              where: { id: products.products_id },
              data: {
                price: products.price,
                on_stock: product.on_stock + products.products_amount,
              },
            });
          }
        });

        return {
          status: 201,
          message: "Account created successfully",
          result: purchases.status,
        };
      }
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
    .mutation(async ({ ctx, input }) => {
      if (input.status === "Entrege") {
        const purchases = await ctx.db.purchases.update({
          where: { id: input.id },
          data: {
            supplier_id: input.supplier_id,
            total: input.total,
            date: input.date,
            status: input.status,
            purchace_details: input.purchace_details,
          },
        });
        if (input.purchace_details) {
          input.purchace_details.forEach(async (products) => {
            const product = await ctx.db.products.update({
              where: { id: products.products_id },
              data: {
                price: products.price,
                on_stock: products.products_amount,
              },
            });
          });
          return {
            status: 201,
            message: "Account created successfully",
            result: purchases.status,
          };
        }
        return {
          status: 201,
          message: "Account created successfully",
          result: purchases.status,
        };
      }
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
