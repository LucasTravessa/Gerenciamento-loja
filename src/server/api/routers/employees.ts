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
      z
        .object({
          name: z.string(),
          email: z.string(),
          address: z.string(),
          phone_number: z.string(),
          role: z.string(),
          salary: z.number(),
          status: z.string(),
          img: z.string(),
        })
        .partial({ img: true }),
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
          img: input.img,
          // createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  update: publicProcedure
    .input(
      z
        .object({
          id: z.number(),
          name: z.string(),
          email: z.string(),
          address: z.string(),
          phone_number: z.string(),
          role: z.string(),
          salary: z.number(),
          status: z.string(),
          img: z.string(),
        })
        .partial()
        .required({ id: true }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.employees.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          address: input.address,
          phone_number: input.phone_number,
          role: input.role,
          salary: input.salary,
          status: input.status,
          img: input.img,
          // createdBy: { connect: { id: ctx.session.user.id } },
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
      ctx.db.employees.delete({ where: { id: input.id } }),
    ),
});
