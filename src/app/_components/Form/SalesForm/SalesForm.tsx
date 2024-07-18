"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { useSales } from "./useSales";
import { useSearchParams } from "next/navigation";
import { type schemaProps } from "./schema";
import { useWatch } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { moneyMask } from "../inputMasks";

let renderCount = 0;

export default function SalesForm() {
  const searchParams = useSearchParams();
  const saleId = searchParams.get("id");

  const employees = api.employees.getAll.useQuery();
  const products = api.products.getAll.useQuery();

  const {
    register,
    watch,
    handleSubmit,
    handleCreation,
    errors,
    fields,
    append,
    remove,
    setValue,
    control,
  } = useSales(Number(saleId));

  const saleDetails = watch("sale_details");
  const totalInput = watch("total");

  useEffect(() => {
    if (saleDetails) {
      saleDetails.forEach((_, index) => {
        const price = watch(`sale_details.${index}.price`);
        setValue(`sale_details.${index}.price`, moneyMask(price));
      });
    }
    setValue("total", moneyMask(totalInput));
  }, [saleDetails, setValue, watch, totalInput]);

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

  function TotalAmount() {
    const cartValues = useWatch({
      control,
      name: "sale_details",
    });
    const total = getTotal(cartValues);
    return String(total);
  }

  function formatDate(date: Date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  }

  renderCount++;

  console.log(renderCount);

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Select
        label="Selecione o empregado"
        selectedKeys={
          watch("employee_id") ? [String(watch("employee_id"))] : undefined
        }
        {...register("employee_id")}
        color={`${errors.employee_id ? "danger" : "default"}`}
      >
        {employees.data ? (
          employees.data.map((e) => (
            <SelectItem key={e.id} value={e.id}>
              {e.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem key={0} value={0}>
            Nenhum
          </SelectItem>
        )}
      </Select>
      <div className="flex w-full gap-4">
        <Input
          label="Cliente"
          type="text"
          value={watch("client")}
          {...register("client")}
          color={`${errors.client ? "danger" : "default"}`}
          errorMessage={errors.client?.message}
        />
        <Input
          disabled
          label="Total"
          inputMode="decimal"
          type="number"
          value={TotalAmount()}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">R$</span>
            </div>
          }
        />
        <Input
          type="date"
          value={
            watch("date") instanceof Date
              ? formatDate(watch("date"))
              : String(watch("date"))
          }
          {...register("date")}
          color={`${errors.date ? "danger" : "default"}`}
          errorMessage={errors.date?.message}
        />
      </div>

      <Button
        onClick={() => {
          append({ products_id: 0, products_amount: 0, price: 0 });
        }}
        color="primary"
        radius="full"
      >
        Adicionar
      </Button>

      <div className="flex w-full flex-col items-center gap-1">
        {fields.map((field, index) => {
          const { name, ref } = register(`sale_details.${index}.products_id`);

          return (
            <div key={field.id} className="flex w-full items-center gap-4">
              <Autocomplete
                defaultItems={products.data}
                label="Selecione um produto"
                name={name}
                ref={ref}
                allowsCustomValue={false}
                selectedKey={
                  watch(`sale_details.${index}.products_id`)
                    ? String(watch(`sale_details.${index}.products_id`))
                    : undefined
                }
                onSelectionChange={(key) =>
                  setValue(`sale_details.${index}.products_id`, Number(key))
                }
              >
                {(p) => (
                  <AutocompleteItem key={p.id}>{p.name}</AutocompleteItem>
                )}
              </Autocomplete>
              <Input
                label="Quantidade"
                inputMode="decimal"
                value={String(watch(`sale_details.${index}.products_amount`))}
                {...register(`sale_details.${index}.products_amount`)}
              />
              <Input
                label="Valor"
                placeholder="0.00"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">R$</span>
                  </div>
                }
                type="number"
                value={String(watch(`sale_details.${index}.price`))}
                {...register(`sale_details.${index}.price`)}
              />
              <FaTrash
                fill="red"
                size="55px"
                className="hover: cursor-pointer"
                onClick={() => {
                  remove(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
