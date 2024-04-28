"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSupplier } from "./useSupplier";
import { useSearchParams } from "next/navigation";

export default function SupplierForm() {
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("id");

  const { register, handleSubmit, handleCreation, errors, watch } = useSupplier(
    Number(supplierId),
  );

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <div className="flex w-4/5 gap-2">
        <Input
          label="Nome Fantasia"
          type="text"
          value={watch("fantasy_name")}
          {...register("fantasy_name")}
          color={`${errors.fantasy_name ? "danger" : "default"}`}
          errorMessage={errors.fantasy_name?.message}
        />
        <Input
          label="CNPJ"
          type="text"
          value={watch("cnpj")}
          {...register("cnpj")}
          color={`${errors.cnpj ? "danger" : "default"}`}
          errorMessage={errors.cnpj?.message}
        />
      </div>

      <div className="flex w-4/5 gap-2">
        <Input
          label="Email"
          type="text"
          value={watch("email")}
          {...register("email")}
          color={`${errors.email ? "danger" : "default"}`}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Endereço"
          type="text"
          value={watch("address")}
          {...register("address")}
          color={`${errors.address ? "danger" : "default"}`}
          errorMessage={errors.address?.message}
        />
      </div>

      <div className="flex w-4/5 gap-2">
        <Input
          label="Telefone"
          type="text"
          value={watch("phone_number")}
          {...register("phone_number")}
          color={`${errors.phone_number ? "danger" : "default"}`}
          errorMessage={errors.phone_number?.message}
        />
        <Select
          label="Selecione o Status"
          {...register("status")}
          selectedKeys={watch("status") ? [watch("status")] : undefined}
          color={`${errors.status ? "danger" : "default"}`}
        >
          <SelectItem key="Ativo">Ativo</SelectItem>
          <SelectItem key="Inativo">Inativo</SelectItem>
          <SelectItem key="Férias">Férias</SelectItem>
        </Select>
      </div>

      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
