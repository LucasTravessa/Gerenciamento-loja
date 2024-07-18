"use client";

import { Button, Input } from "@nextui-org/react";
import { useEmployees } from "./useEmployees";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import UploadComponent from "../../Upload";
import { useState } from "react";
import { useUploadThing } from "~/utils/uploadthing";
import type { schemaProps } from "./schema";

export default function EmployeesForm() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  const [files, setFiles] = useState<File[]>([]);

  const { register, errors, handleSubmit, watch, handleCreation } =
    useEmployees(Number(employeeId));

  const { startUpload } = useUploadThing("profilePicture", {
    onUploadError: () => {
      throw new Error("Error uploading file");
    },
  });

  async function handleCreate(data: schemaProps) {
    if (files.length > 0) {
      await startUpload(files)
        .then(async (res) => {
          const payload = { ...data, img: res?.[0]?.url ?? "" };
          await handleCreation(payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreate)}
    >
      <div className="flex w-4/5">
        <UploadComponent
          path={watch("img")}
          files={files}
          setFiles={setFiles}
        />
      </div>
      <div className="flex w-4/5 gap-2">
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

      <div className="flex w-4/5 gap-2">
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

      <div className="flex w-4/5 gap-2">
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
        className="w-4/5"
        label="Selecione o Status"
        {...register("status")}
        selectedKeys={watch("status") ? [watch("status")] : undefined}
        color={`${errors.status ? "danger" : "default"}`}
      >
        <SelectItem key="Ativo">Ativo</SelectItem>
        <SelectItem key="Inativo">Inativo</SelectItem>
        <SelectItem key="Férias">Férias</SelectItem>
      </Select>

      <Button radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
