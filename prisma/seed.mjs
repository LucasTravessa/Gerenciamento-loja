import { PrismaClient } from "@prisma/client";
import {
  admin,
  employees,
  products,
  purchases,
  sales,
  suppliers,
} from "./data.mjs";

const prisma = new PrismaClient();

const seeding = async () => {
  try {
    if (
      (await prisma.employees.findMany()) ||
      (await prisma.products.findMany()) ||
      (await prisma.suppliers.findMany()) ||
      (await prisma.purchases.findMany()) ||
      (await prisma.sales.findMany())
    ) {
      console.log("Clearing database...");
      if (await prisma.user.findFirst({ where: { email: "admin@sgl.com" } }))
        await prisma.user.delete({ where: { email: "admin@sgl.com" } });

      await prisma.sales.deleteMany();
      await prisma.$queryRaw`ALTER SEQUENCE "Sales_id_seq" RESTART WITH 1`;
      console.log("reset sales auto increment to 1");

      await prisma.purchases.deleteMany();
      await prisma.$queryRaw`ALTER SEQUENCE "Purchases_id_seq" RESTART WITH 1`;
      console.log("reset purchases auto increment to 1");

      await prisma.employees.deleteMany();
      await prisma.$queryRaw`ALTER SEQUENCE "Employees_id_seq" RESTART WITH 1`;
      console.log("reset employees auto increment to 1");

      await prisma.products.deleteMany();
      await prisma.$queryRaw`ALTER SEQUENCE "Products_id_seq" RESTART WITH 1`;
      console.log("reset products auto increment to 1");

      await prisma.suppliers.deleteMany();
      await prisma.$queryRaw`ALTER SEQUENCE "Suppliers_id_seq" RESTART WITH 1`;
      console.log("reset suppliers auto increment to 1");

      console.log("Database cleared");
    }
    console.log("Seeding database...");
    await prisma.user.create({
      data: admin,
    });
    console.log("Admin user created");
    const employeesPromise = await prisma.employees.createMany({
      data: employees,
    });
    console.log("Added employee data");
    const suppliersPromise = await prisma.suppliers.createMany({
      data: suppliers,
    });
    console.log("Added supplier data");
    const productsPromise = await prisma.products.createMany({
      data: products,
    });
    console.log("Added product data");

    Promise.all([employeesPromise, suppliersPromise, productsPromise]).then(
      async () => {
        await prisma.purchases.createMany({
          data: purchases,
        });
        console.log("Added purchase data");
        await prisma.sales.createMany({
          data: sales,
        });
        console.log("Added sale data");
      },
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seeding();
