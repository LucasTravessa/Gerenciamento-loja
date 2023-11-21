import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const suppliersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.suppliers.findMany();
  }),
  getOne: publicProcedure.input(Number).query(({ ctx, input }) => {
    return ctx.db.suppliers.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        fantasy_name: z.string(),
        cnpj: z.string(),
        email: z.string(),
        address: z.string(),
        phone_number: z.string(),
        status: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.suppliers.create({
        data: {
          fantasy_name: input.fantasy_name,
          cnpj: input.cnpj,
          email: input.email,
          address: input.address,
          phone_number: input.phone_number,
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
          fantasy_name: z.string(),
          cnpj: z.string(),
          email: z.string(),
          address: z.string(),
          phone_number: z.string(),
          status: z.string(),
        })
        .partial()
        .required({ id: true }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.suppliers.update({
        where: { id: input.id },
        data: {
          fantasy_name: input.fantasy_name,
          cnpj: input.cnpj,
          email: input.email,
          address: input.address,
          phone_number: input.phone_number,
          status: input.status,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
