"use server";

import { api } from "~/trpc/server";

type Purchases = {
  id: number;
  supplier_id: number;
  total: number;
  date: Date;
  status: string;
  purchace_details: {
    products_name: string;
    products_amount: number;
    price: number;
  }[];
}[];

//save entrege status products

export async function createProducts(purchases, product) {
  console.log("rodou");

  const purchasesOk = purchases.filter((p) => p.status === "Entrege");

  purchasesOk.forEach((p) => {
    p.purchace_details.forEach((details) => {
      const isSaved = product.some(
        (product) => product.name === details.products_name,
      );
      if (!isSaved) {
      }
    });
  });
}
