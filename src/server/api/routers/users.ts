import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.users.findMany();
  }),
});
