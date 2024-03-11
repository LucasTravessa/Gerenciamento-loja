"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { BiSolidPlusCircle } from "react-icons/bi";
import { api } from "~/trpc/react";
import { useSales } from "./useSales";
import { useEffect } from "react";

export default function SalesForm() {
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
  } = useSales();

  useEffect(() => {
    let total = 0;
    const amount = watch(`sales_details.${0}.products_amount`);
    const price = watch(`sales_details.${0}.price`);
    total += amount * price;

    setValue("total", total);
  });

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Select
        label="Selecione o empregado"
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
          {...register("client")}
          color={`${errors.client ? "danger" : "default"}`}
          errorMessage={errors.client?.message}
        />
        <Input
          disabled
          label="Total"
          inputMode="decimal"
          type="number"
          {...register("total")}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">R$</span>
            </div>
          }
          color={`${errors.total ? "danger" : "default"}`}
          errorMessage={errors.total?.message}
        />
        <Input
          type="date"
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
          const { name, ref } = register(`sales_details.${index}.products_id`);

          return (
            <div key={field.id} className="flex w-full items-center gap-4">
              <Autocomplete
                defaultItems={products.data}
                label="Selecione um produto"
                name={name}
                ref={ref}
                allowsCustomValue={false}
                onSelectionChange={(key) =>
                  setValue(`sales_details.${index}.products_id`, Number(key))
                }
              >
                {(p) => (
                  <AutocompleteItem key={p.id}>{p.name}</AutocompleteItem>
                )}
              </Autocomplete>
              <Input
                label="Quantidade"
                inputMode="decimal"
                {...register(`sales_details.${index}.products_amount`)}
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
                {...register(`sales_details.${index}.price`)}
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
