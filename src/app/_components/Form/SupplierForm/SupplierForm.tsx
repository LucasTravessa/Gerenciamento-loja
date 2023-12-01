'use client';

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSupplier } from "./useSupplier";

export default function SupplierForm() {

    const {register, handleSubmit, handleCreation, errors} = useSupplier()

    return(
        <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit(handleCreation)} 
        >
            <div className="flex gap-2">
                <Input
                    label='Nome Fantasia'
                    type="text"
                    {...register("fantasy_name")}
                    color={`${errors.fantasy_name ? "danger" : "default"}`}
                    errorMessage={errors.fantasy_name && `${errors.fantasy_name.message}`}
                />
                <Input
                    label='CNPJ'
                    type="text"
                    {...register("cnpj")}
                    color={`${errors.cnpj ? "danger" : "default"}`}
                    errorMessage={errors.cnpj && `${errors.cnpj.message}`}
                />
            </div>

            <div className="flex gap-2">
                <Input
                    label='Email'
                    type="text"
                    {...register("email")}
                    color={`${errors.email ? "danger" : "default"}`}
                    errorMessage={errors.email && `${errors.email.message}`}
                />
                <Input
                    label='Endereço'
                    type="text"
                    {...register("address")}
                    color={`${errors.address ? "danger" : "default"}`}
                    errorMessage={errors.address && `${errors.address.message}`}
                />
            </div>

            <div className="flex gap-2">
                <Input
                    label='Telefone'
                    type="text"
                    {...register("phone_number")}
                    color={`${errors.phone_number ? "danger" : "default"}`}
                    errorMessage={errors.phone_number && `${errors.phone_number.message}`}
                />
                <Select
                    label="Selecione o Status"
                    {...register("status")}
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
    )
}