"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSales } from "./useSales";
import { api } from "~/trpc/react";
import { BiPlus, BiSolidPlusCircle } from "react-icons/bi";

export default function SalesForm() {
  const employees = api.employees.getAll.useQuery();
  const products = api.products.getAll.useQuery();
  const { register, handleSubmit, handleCreation, errors } = useSales();

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
          label="Total"
          inputMode="decimal"
          {...register("total")}
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
      <div className="flex w-full items-center gap-4">
        <Select
          label="Selecione o produto"
          // {...register("employee_id")}
          // color={`${errors.employee_id ? "danger" : "default"}`}
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
          // {...register("total")}
          // color={`${errors.total ? "danger" : "default"}`}
          // errorMessage={errors.total && `${errors.total.message}`}
        />
        <Input label="Valor" inputMode="decimal" value="R$10" />
        <BiSolidPlusCircle fill="cyan" size="80px" />
      </div>
      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
