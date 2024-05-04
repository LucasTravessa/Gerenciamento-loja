import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useEmployees = (employeeId: number) => {
  const router = useRouter();
  const addEmployee = api.employees.create.useMutation();
  const putEmployee = api.employees.update.useMutation();
  const apiData = api.employees.getOne.useQuery(employeeId).data;

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
      name: "",
      email: "",
      role: "",
      phone_number: "",
      address: "",
      salary: 0,
    },
    values: values,
  });

  async function handleCreation(data: schemaProps) {
    if (apiData == null) {
      await addEmployee.mutateAsync(data);
      router.push("/user/funcionarios");
      router.refresh();
      return;
    }
    await putEmployee.mutateAsync({ ...data, id: employeeId });
    router.push("/user/funcionarios");
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
