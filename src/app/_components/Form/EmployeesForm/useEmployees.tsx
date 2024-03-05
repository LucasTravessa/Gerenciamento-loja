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

  console.log(apiData);

  const values = {
    name: String(apiData?.name),
    email: String(apiData?.email),
    role: String(apiData?.role),
    phone_number: String(apiData?.phone_number),
    address: String(apiData?.address),
    salary: Number(apiData?.salary),
    status: String(apiData?.status),
  };

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
      name: "",
      email: "",
      role: "",
      phone_number: "",
      address: "",
      salary: 0,
    },
    values: apiData != null ? values : undefined,
  });

  function handleCreation(data: schemaProps) {
    if (apiData == null) {
      addEmployee.mutate(data);
      router.push("/user/funcionarios");
      router.refresh();
      return;
    }
    putEmployee.mutate({ ...data, id: employeeId });
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
