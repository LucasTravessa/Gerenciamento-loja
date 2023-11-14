import { Button, Input } from "@nextui-org/react";

export default function EmployeesForm() {
    return(
        <form className="flex flex-col justify-center items-center gap-4">
            <Input label='Nome' type="text" />
            <Input label='Email' type="email" />
            <Input label='Cargo' type="text" />
            <Input label='Telefone' type="text" />
            <Button color="primary" radius="full" type="submit" >Enviar</Button>
        </form>
    )
}