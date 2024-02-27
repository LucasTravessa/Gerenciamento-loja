"use server";

import { api } from "~/trpc/server";

type purchases = {
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
};

//save entrege status products

export async function createProducts() {
  const purchases: purchases[] = await api.purchases.getAll.query();
  const product = await api.products.getAll.query();

  console.log(purchases);

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
