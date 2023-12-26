"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { BiSolidPlusCircle } from "react-icons/bi";
import { api } from "~/trpc/react";
import { useSales } from "./useSales";

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
  } = useSales();

  function handleTotal() {
    let total = 0;
    const products = watch("sales_details");
    products.map((field) => {
      total += field.price * field.products_amount;
    });
    const string = String(total.toFixed(2));
    return string;
  }

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
          errorMessage={errors.client && `${errors.client.message}`}
        />
        <Input
          disabled
          label="Total"
          inputMode="decimal"
          type="number"
          value={handleTotal()}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">R$</span>
            </div>
          }
          color={`${errors.total ? "danger" : "default"}`}
          errorMessage={errors.total && `${errors.total.message}`}
        />
        <Input
          type="date"
          {...register("date")}
          color={`${errors.date ? "danger" : "default"}`}
          errorMessage={errors.date && `${errors.date.message}`}
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
          return (
            <div key={field.id} className="flex w-full items-center gap-4">
              <Select
                label="Selecione o produto"
                {...register(`sales_details.${index}.products_id`)}
              >
                {products.data ? (
                  products.data.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key={0} value={0}>
                    Nenhum
                  </SelectItem>
                )}
              </Select>
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
                className="&hover: cursor-pointer"
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
