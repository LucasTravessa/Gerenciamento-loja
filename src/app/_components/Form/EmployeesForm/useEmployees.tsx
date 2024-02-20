import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useEmployees = (data: any) => {
  const router = useRouter();
  const addEmployee = api.employees.create.useMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      email: data.email,
      role: data.role,
      phone_number: data.phone_number,
      address: data.address,
      salary: data.salary,
    },
  });

  function handleCreation(data: schemaProps) {
    addEmployee.mutate(data);
    router.push("/user/funcionarios");
    router.refresh();
  }

  return {
    register,
    handleSubmit,
    watch,
    handleCreation,
    errors,
    isSubmitting,
  };
};
