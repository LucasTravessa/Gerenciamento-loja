"use client";

import { Button, Input } from "@nextui-org/react";
import { useEmployees } from "./useEmployees";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function EmployeesForm() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const { register, errors, handleSubmit, watch, handleCreation } =
    useEmployees(Number(employeeId));

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <div className="flex gap-2">
        <Input
          label="Nome"
          type="text"
          value={watch("name")}
          {...register("name")}
          color={`${errors.name ? "danger" : "default"}`}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          value={watch("email")}
          {...register("email")}
          color={`${errors.email ? "danger" : "default"}`}
          errorMessage={errors.email?.message}
        />
      </div>

      <div className="flex gap-2">
        <Input
          label="Cargo"
          type="text"
          value={watch("role")}
          {...register("role")}
          color={`${errors.role ? "danger" : "default"}`}
          errorMessage={errors.role?.message}
        />

        <Input
          label="Telefone"
          type="text"
          value={watch("phone_number")}
          {...register("phone_number")}
          color={`${errors.phone_number ? "danger" : "default"}`}
          errorMessage={errors.phone_number?.message}
        />
      </div>

      <div className="flex gap-2">
        <Input
          label="Endereço"
          type="text"
          value={watch("address")}
          {...register("address")}
          color={`${errors.address ? "danger" : "default"}`}
          errorMessage={errors.address?.message}
        />

        <Input
          label="Salario"
          startContent="R$"
          type="number"
          step="0.01"
          value={String(watch("salary"))}
          {...register("salary")}
          color={`${errors.salary ? "danger" : "default"}`}
          errorMessage={errors.salary?.message}
        />
      </div>

      <Select
        label="Selecione o Status"
        {...register("status")}
        selectedKeys={[watch("status")]}
        color={`${errors.status ? "danger" : "default"}`}
      >
        <SelectItem key="Ativo">Ativo</SelectItem>
        <SelectItem key="Inativo">Inativo</SelectItem>
        <SelectItem key="Férias">Férias</SelectItem>
      </Select>

      {/*#TODO input de enviar imagem */}
      {/* <Input 
                    type="file" 
                    accept="png, jpg"
                /> */}

      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
