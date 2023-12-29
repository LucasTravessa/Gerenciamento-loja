import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });
  const createProduct = api.products.create.useMutation();
  const router = useRouter();

  function handleCreation(data: schemaProps) {
    createProduct.mutate({
      ...data,
      price: parseInt(data.price),
      on_stock: parseInt(data.on_stock),
    });
    router.push("/estoque");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    handleCreation,
    errors,
  };
};
