"use client";
import { Button, Input } from "@nextui-org/react";
import { useProduct } from "./useProduct";

export default function ProductForm() {
  const { register, handleSubmit, handleCreation, errors } = useProduct();

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Input
        className="w-4/5"
        label="Nome"
        type="text"
        {...register("name")}
        color={`${errors.name ? "danger" : "default"}`}
        errorMessage={errors.name?.message}
      />
      <Input
        className="w-4/5"
        label="Preço"
        type="number"
        {...register("price")}
        color={`${errors.price ? "danger" : "default"}`}
        errorMessage={errors.price?.message}
      />
      <Input
        className="w-4/5"
        label="Quantidade"
        type="number"
        {...register("on_stock")}
        color={`${errors.on_stock ? "danger" : "default"}`}
        errorMessage={errors.on_stock?.message}
      />
      <Button color="primary" radius="full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
