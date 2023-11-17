import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, schemaProps } from "./schema";
import { api } from "~/trpc/react";

export const useEmployees = () => {
  const {
    register,
    handleSubmit,
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
      salary: "",
      address: "",
    },
  });


  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
};
