import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useEmployees = () => {
  const router = useRouter();
  const addEmployee = api.employees.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  function handleCreation(data: schemaProps) {
    addEmployee.mutate(data);
    router.push("/user/funcionarios");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    handleCreation,
    errors,
    isSubmitting,
  };
};
