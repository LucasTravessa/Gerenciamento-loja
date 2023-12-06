import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { date } from "zod";

export const useSales = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      client: "",
      total: "",
      date: "",
      employee_id: "",
      sales_details: [],
    },
  });
  const createSale = api.sales.create.useMutation();
  const router = useRouter();

  function handleCreation(data: schemaProps) {
    const correctData = {
      ...data,
      date: new Date(data.date),
      employee_id: Number(data.employee_id),
      total: Number(data.total),
      sales_details: data.sales_details.map((s) => ({
        ...s,
        products_id: Number(s.products_id),
        quantity: Number(s.products_amount),
        price: Number(s.price),
      })),
    };
    console.log(correctData);

    // createSale.mutate({ ...data });
    router.push("/vendas");
    router.refresh();
  }

  return {
    register,
    watch,
    handleSubmit,
    handleCreation,
    errors,
  };
};
