"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { usePurchases } from "./usePurchases";
import { api } from "~/trpc/react";
import { type schemaProps } from "./schema";
import { useSearchParams } from "next/navigation";
import { useWatch } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

export default function PurchasesForm() {
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("id");

  const suppliers = api.suppliers.getAll.useQuery();
  const products = api.products.getAll.useQuery();
  const {
    register,
    handleSubmit,
    handleCreation,
    errors,
    append,
    fields,
    remove,
    watch,
    control,
    setValue,
  } = usePurchases(Number(purchaseId));

  function getTotal(payload: schemaProps["purchace_details"]) {
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
      name: "purchace_details",
    });
    const total = getTotal(cartValues);
    return String(total);
  }

  function formatDate(date: Date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  }

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Select
        label="Selecione o fornecedor"
        selectedKeys={
          watch("supplier_id") ? [String(watch("supplier_id"))] : undefined
        }
        {...register("supplier_id")}
        color={`${errors.supplier_id ? "danger" : "default"}`}
      >
        {suppliers.data ? (
          suppliers.data.map((s) => (
            <SelectItem key={s.id}>{s.fantasy_name}</SelectItem>
          ))
        ) : (
          <SelectItem key={0}>Nenhum fornecedor</SelectItem>
        )}
      </Select>
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
      <Input
        placeholder="Total"
        disabled
        type="number"
        value={TotalAmount()}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">R$</span>
          </div>
        }
      />
      <Select
        label="Selecione o Status"
        selectedKeys={watch("status") ? [String(watch("status"))] : undefined}
        {...register("status")}
        color={`${errors.status ? "danger" : "default"}`}
        errorMessage={errors.status?.message}
      >
        <SelectItem key="Entrege">Entrege</SelectItem>
        <SelectItem key="Atrasado">Atrasada</SelectItem>
        <SelectItem key="Pendente">Pendente</SelectItem>
        <SelectItem key="Cancelado">Cancelada</SelectItem>
      </Select>

      <Button
        onClick={() => {
          append({ products_id: 0, products_amount: 0, price: 0 });
        }}
        variant="flat"
        radius="full"
      >
        Adicionar
      </Button>

      <div className="flex w-full flex-col items-center gap-1">
        {fields.map((field, index) => {
          const { name, ref } = register(
            `purchace_details.${index}.products_id`,
          );
          return (
            <div key={field.id} className="flex w-full items-center gap-4">
              <Autocomplete
                defaultItems={products.data}
                label="Selecione um produto"
                name={name}
                ref={ref}
                allowsCustomValue={false}
                selectedKey={
                  watch(`purchace_details.${index}.products_id`)
                    ? String(watch(`purchace_details.${index}.products_id`))
                    : undefined
                }
                onSelectionChange={(key) =>
                  setValue(`purchace_details.${index}.products_id`, Number(key))
                }
              >
                {(p) => (
                  <AutocompleteItem key={p.id}>{p.name}</AutocompleteItem>
                )}
              </Autocomplete>
              <Input
                label="Quantidade"
                inputMode="decimal"
                value={String(
                  watch(`purchace_details.${index}.products_amount`),
                )}
                {...register(`purchace_details.${index}.products_amount`)}
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
                value={String(watch(`purchace_details.${index}.price`))}
                {...register(`purchace_details.${index}.price`)}
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

      <Button radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
