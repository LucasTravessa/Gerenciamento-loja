import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type schemaProps } from "./schema";

export const usePurchases = () => {
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
    console.log(data);
  }

  return {
    register,
    handleSubmit,
    handleCreation,
    errors,
  };
};
