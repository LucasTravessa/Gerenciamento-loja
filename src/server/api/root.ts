import { createTRPCRouter } from "~/server/api/trpc";
import { employeesRouter } from "./routers/employees";
import { suppliersRouter } from "./routers/suppliers";
import { productsRouter } from "./routers/products";
import { signUpRouter } from "./routers/signUp";
import { salesRouter } from "./routers/sales";
import { purchasesRouter } from "./routers/purchases";

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
  sales: salesRouter,
  purchases: purchasesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
