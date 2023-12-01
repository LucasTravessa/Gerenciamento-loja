import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { schema, schemaProps } from "./schema";

export const useSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      fantasy_name: "",
      cnpj: "",
      email: "",
      address: "",
      phone_number: "",
    },
  });

  const addSupplier = api.suppliers.create.useMutation();
  const router = useRouter();

  function handleCreation(data: schemaProps) {
    addSupplier.mutate(data);
    router.push("/fornecedores");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    handleCreation,
    errors,
  };
};
