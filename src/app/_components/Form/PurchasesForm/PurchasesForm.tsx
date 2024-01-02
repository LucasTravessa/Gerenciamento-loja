"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { usePurchases } from "./usePurchases";

export default function PurchasesForm() {
  const { register, handleSubmit, handleCreation, errors } = usePurchases();

  return (
    <form className="flex flex-col items-center gap-4">
      <Input type="text" label="Produto" />
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
