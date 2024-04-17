import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.products.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.products.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        on_stock: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.products.create({
        data: {
          name: input.name,
          price: input.price,
          on_stock: input.on_stock,
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
      ctx.db.products.delete({ where: { id: input.id } }),
    ),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        on_stock: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.products.findUnique({
        where: { id: input.id },
      });

      if (product) {
        if (input.on_stock < 0) {
          const result = await ctx.db.products.update({
            where: { id: input.id },
            data: {
              name: input.name,
              price: input.price,
              on_stock: product.on_stock - input.on_stock,
            },
          });
          return {
            status: 201,
            message: "Account created successfully",
            result: result.name,
          };
        }

        if (input.on_stock > 0) {
          const result = await ctx.db.products.update({
            where: { id: input.id },
            data: {
              name: input.name,
              price: input.price,
              on_stock: product.on_stock + input.on_stock,
            },
          });
          return {
            status: 201,
            message: "Account created successfully",
            result: result.name,
          };
        }
      }
      const result = await ctx.db.products.update({
        where: { id: input.id },
        data: {
          name: input.name,
          price: input.price,
          on_stock: input.on_stock,
        },
      });
    }),
});
