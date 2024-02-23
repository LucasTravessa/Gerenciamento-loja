"use server";

import { Products } from "@prisma/client";
import { api } from "~/trpc/server";

type Props = {
  purchases: {
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
  product: Products[];
};

//save entrege status products

export async function useProducts() {
  async function createProducts() {
    const purchases = await api.purchases.getAll.query();

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

  return {
    createProducts,
  };
}
