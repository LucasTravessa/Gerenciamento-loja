"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { usePurchases } from "./usePurchases";
import { api } from "~/trpc/react";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useEffect } from "react";

export default function PurchasesForm() {
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
    setValue,
  } = usePurchases();

  useEffect(() => {
    let total = 0;
    const amount = watch(`purchace_details.${0}.products_amount`);
    const price = watch(`purchace_details.${0}.price`);
    total += amount * price;

    setValue("total", total);
  });

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Select
        label="Selecione o fornecedor"
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
        {...register("date")}
        color={`${errors.date ? "danger" : "default"}`}
        errorMessage={errors.date && `${errors.date.message}`}
      />
      <Input
        placeholder="Total"
        disabled
        type="number"
        {...register("total")}
        color={`${errors.total ? "danger" : "default"}`}
        errorMessage={errors.total && `${errors.total.message}`}
      />
      <Select
        label="Selecione o Status"
        {...register("status")}
        color={`${errors.status ? "danger" : "default"}`}
        errorMessage={errors.status && `${errors.status.message}`}
      >
        <SelectItem key="Entrege">Entrege</SelectItem>
        <SelectItem key="Atrasada">Atrasada</SelectItem>
        <SelectItem key="Pendente">Pendente</SelectItem>
        <SelectItem key="Cancelada">Cancelada</SelectItem>
      </Select>

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
          return (
            <div key={field.id} className="flex w-full items-center gap-4">
              <Select label="Selecione o produto">
                {products.data ? (
                  products.data.map((p) => (
                    <SelectItem key={p.id}>{p.name}</SelectItem>
                  ))
                ) : (
                  <SelectItem key={0}>Nenhum</SelectItem>
                )}
              </Select>
              <Input
                label="Quantidade"
                inputMode="decimal"
                {...register(`purchace_details.${index}.products_amount`)}
              />
              <Input
                label="Valor"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">R$</span>
                  </div>
                }
                type="number"
                {...register(`purchace_details.${index}.price`)}
              />
              <BiSolidPlusCircle
                fill="red"
                size="80px"
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
