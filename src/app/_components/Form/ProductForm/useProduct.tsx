import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useProduct = (productId: number) => {
  const router = useRouter();
  const addProduct = api.products.create.useMutation();
  const putProduct = api.products.update.useMutation();
  const apiData = api.products.getOne.useQuery(productId).data;

  const values = apiData ? schema.parse(apiData) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    values: values,
  });

  function handleCreation(data: schemaProps) {
    if (apiData == null) {
      addProduct.mutate(data);
      router.push("/user/estoque");
      router.refresh();
      return;
    }
    putProduct.mutate({ ...data, id: productId });
    router.push("/user/estoque");
    router.refresh();
  }

  return {
    register,
    watch,
    handleSubmit,
    handleCreation,
    errors,
  };
};
