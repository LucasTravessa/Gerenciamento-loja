import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type schemaProps } from "./schema";

export const usePurchases = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "purchases_details", // unique name for your Field Array
  });

  function handleCreation(data: schemaProps) {
    console.log(data);
  }

  return {
    register,
    watch,
    setValue,
    handleSubmit,
    handleCreation,
    errors,
    fields,
    append,
    remove,
  };
};
