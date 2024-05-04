"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const usePurchases = (purchaseId: number) => {
  const router = useRouter();
  const addPurchases = api.purchases.create.useMutation();
  const putPurchases = api.purchases.update.useMutation();
  const apiData = api.purchases.getOne.useQuery(purchaseId).data;

  const values = apiData ? schema.parse(apiData) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      total: 1,
      purchace_details: [],
    },
    resolver: zodResolver(schema),
    values,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchace_details",
  });

  function getTotal(payload: schemaProps["purchace_details"]) {
    let total = 0;

    for (const item of payload) {
      const price = Number.isNaN(item.price) ? 0 : Number(item.price);
      const amount = Number.isNaN(item.products_amount)
        ? 0
        : Number(item.products_amount);
      total = total + price * amount;
    }

    return total;
  }

  function handleCreation(data: schemaProps) {
    data.total = getTotal(data.purchace_details);
    if (apiData == null) {
      addPurchases.mutate(data);
      router.push("/user/compras");
      router.refresh();
      return;
    }
    putPurchases.mutate({ ...data, id: purchaseId });
    router.push("/user/compras");
    router.refresh();
  }

  return {
    register,
    watch,
    setValue,
    handleSubmit,
    handleCreation,
    errors,
    fields,
    append,
    remove,
    control,
  };
};
