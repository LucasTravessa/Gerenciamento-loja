import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useSales = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "sales_details", // unique name for your Field Array
  });
  const createSale = api.sales.create.useMutation();
  const router = useRouter();

  function handleCreation(data: schemaProps) {
    let total = 0;
    data.sales_details.map((field) => {
      total += field.price * field.products_amount;
    });
    data.total = total;
    console.log(data);

    createSale.mutate(data);
    router.push("/user/vendas");
    router.refresh();
  }

  return {
    register,
    watch,
    handleSubmit,
    handleCreation,
    errors,
    fields,
    append,
    remove,
  };
};
