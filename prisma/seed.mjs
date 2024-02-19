import { PrismaClient } from "@prisma/client";
import { employees, products, purchases, sales, suppliers } from "./data.mjs";

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

      await prisma.sales.deleteMany();
      await prisma.purchases.deleteMany();
      await prisma.employees.deleteMany();
      await prisma.products.deleteMany();
      await prisma.suppliers.deleteMany();
      console.log("Database cleared");
    }
    console.log("Seeding database...");
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
