import { createTRPCRouter } from "~/server/api/trpc";
import { employeesRouter } from "./routers/employees";
import { suppliersRouter } from "./routers/suppliers";
import { productsRouter } from "./routers/products";
import { signUpRouter } from "./routers/signUp";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  signup: signUpRouter,
  employees: employeesRouter,
  suppliers: suppliersRouter,
  products: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
