import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { schema, type schemaProps } from "./schema";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export const useSales = (saleId: number) => {
  const router = useRouter();
  const addSale = api.sales.create.useMutation();
  const putSale = api.sales.update.useMutation();
  const apiData = api.sales.getOne.useQuery(saleId).data;

  const values = apiData ? schema.parse(apiData) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      total: 1,
      sale_details: [],
    },
    values,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "sale_details", // unique name for your Field Array
  });

  function getTotal(payload: schemaProps["sale_details"]) {
    let total = 0;

    for (const item of payload) {
      const price = Number.isNaN(item.price) ? 0 : Number(item.price);
      const amount = Number.isNaN(item.products_amount)
        ? 0
        : Number(item.products_amount);
      total = total + price * amount;
    }

    return total;
  }

  async function handleCreation(data: schemaProps) {
    data.total = getTotal(data.sale_details);
    if (apiData == null) {
      await addSale.mutateAsync(data);
      router.push("/user/vendas");
      router.refresh();
      return;
    }
    await putSale.mutateAsync({ ...data, id: saleId });
    router.push("/user/vendas");
    router.refresh();
  }

  return {
    register,
    watch,
    handleSubmit,
    handleCreation,
    setValue,
    errors,
    fields,
    append,
    remove,
    control,
  };
};
