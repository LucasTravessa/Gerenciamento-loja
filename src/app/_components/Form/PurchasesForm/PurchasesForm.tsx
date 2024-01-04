"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { usePurchases } from "./usePurchases";
import { api } from "~/trpc/react";

export default function PurchasesForm() {
  const suppliers = api.suppliers.getAll.useQuery();
  const { register, handleSubmit, handleCreation, errors } = usePurchases();

  return (
    <form className="flex flex-col items-center gap-4">
      <Select label="Selecione o fornecedor">
        {suppliers.data ? (
          suppliers.data.map((s) => (
            <SelectItem key={s.id}>{s.fantasy_name}</SelectItem>
          ))
        ) : (
          <SelectItem key={0}>Nenhum fornecedor</SelectItem>
        )}
      </Select>
      <Input type="date" />
      <Select label="Selecione o Status">
        <SelectItem key="done">Entrege</SelectItem>
        <SelectItem key="later">Atrasada</SelectItem>
        <SelectItem key="pendent">Pendente</SelectItem>
        <SelectItem key="canceled">Cancelada</SelectItem>
      </Select>
      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
