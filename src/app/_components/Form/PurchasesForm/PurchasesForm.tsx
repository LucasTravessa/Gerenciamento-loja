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
    const purchaceDetails = watch("purchace_details");
    purchaceDetails.map((pd) => {
      total += pd.price * pd.products_amount;
    });

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
        errorMessage={errors.date?.message}
      />
      <Input
        placeholder="Total"
        disabled
        type="number"
        {...register("total")}
        color={`${errors.total ? "danger" : "default"}`}
        errorMessage={errors.total?.message}
      />
      <Select
        label="Selecione o Status"
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
        color="primary"
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
