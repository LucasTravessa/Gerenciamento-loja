"use client";
import { Button, Input } from "@nextui-org/react";
import { useProduct } from "./useProduct";
import { useSearchParams } from "next/navigation";

export default function ProductForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { register, watch, handleSubmit, handleCreation, errors } = useProduct(
    Number(productId),
  );

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(handleCreation)}
    >
      <Input
        className="w-4/5"
        label="Nome"
        type="text"
        value={watch("name")}
        {...register("name")}
        color={`${errors.name ? "danger" : "default"}`}
        errorMessage={errors.name?.message}
      />
      <Input
        className="w-4/5"
        label="Preço"
        type="number"
        value={String(watch("price"))}
        {...register("price")}
        color={`${errors.price ? "danger" : "default"}`}
        errorMessage={errors.price?.message}
      />
      <Input
        className="w-4/5"
        label="Quantidade"
        type="number"
        value={String(watch("on_stock"))}
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
