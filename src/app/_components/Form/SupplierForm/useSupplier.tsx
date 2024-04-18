import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { schema, type schemaProps } from "./schema";

export const useSupplier = (supplierId: number) => {
  const router = useRouter();
  const addSupplier = api.suppliers.create.useMutation();
  const putSupplier = api.suppliers.update.useMutation();
  const apiData = api.suppliers.getOne.useQuery(supplierId).data;

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
    defaultValues: {
      status: undefined,
    },
    values: values,
  });

  function handleCreation(data: schemaProps) {
    if (apiData == null) {
      addSupplier.mutate(data);
      router.push("/user/fornecedores");
      router.refresh();
      return;
    }
    putSupplier.mutate({ ...data, id: supplierId });
    router.push("/user/fornecedores");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    watch,
    handleCreation,
    errors,
  };
};
