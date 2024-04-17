import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useProduct = () => {
  const router = useRouter();
  const createProduct = api.products.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  function handleCreation(data: schemaProps) {
    createProduct.mutate(data);
    router.push("/user/estoque");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    handleCreation,
    errors,
  };
};
