"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useProducts } from "~/server/actions";

export const usePurchases = () => {
  const createPurchases = api.purchases.create.useMutation();
  const { createProducts } = useProducts();
  const router = useRouter();

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
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchace_details",
  });

  function handleCreation(data: schemaProps) {
    // createPurchases.mutate(data);
    router.push("/user/compras");
    router.refresh();

    createProducts();
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
  };
};
