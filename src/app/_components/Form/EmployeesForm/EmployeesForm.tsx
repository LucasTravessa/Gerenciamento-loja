import { Button, Input } from "@nextui-org/react";
import { useEmployees } from "./useEmployees";
import { Select, SelectItem } from '@nextui-org/react'
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function EmployeesForm() {

    const {register, errors, isSubmitting} = useEmployees();
    const [status, setStatus] = useState<string>('')

    return(
        <form className="flex flex-col items-center gap-4">

            <div className="flex gap-2">
                <Input 
                    label='Nome' 
                    type="text"
                    {...register('name')} 
                    color={`${errors.name ? 'danger' : 'default'}`}
                    errorMessage={errors.name && `${errors.name.message}`}
                />

                <Input 
                    label='Email' 
                    type="email" 
                    {...register('email')}
                    color={`${errors.email ? 'danger' : 'default'}`}
                    errorMessage={errors.email && `${errors.email.message}`}
                />
            </div>

            <div className="flex gap-2">
                <Input 
                    label='Cargo' 
                    type="text" 
                    {...register('role')}
                    color={`${errors.role ? 'danger' : 'default'}`}
                    errorMessage={errors.role && `${errors.role.message}`}
                />

                <Input 
                    label='Telefone' 
                    type="text" 
                    {...register('phone')}
                    color={`${errors.phone ? 'danger' : 'default'}`}
                    errorMessage={errors.phone && `${errors.phone.message}`}
                />
            </div>

            <div className="flex gap-2">
                <Input
                    label='Endereço'
                    type="text"
                    {...register('address')}
                    color={`${errors.address ? 'danger' : 'default'}`}
                    errorMessage={errors.address && `${errors.address.message}`}
                />
                
                <Input
                    label='Salario'
                    type="text"
                    {...register('salary')}
                    color={`${errors.salary ? 'danger' : 'default'}`}
                    errorMessage={errors.salary && `${errors.salary.message}`}
                />
            </div>

                <Select label='Selecione o Status'>
                    <SelectItem key='active'>Ativo</SelectItem>
                    <SelectItem key='inactive'>Inativo</SelectItem>
                    <SelectItem key='vacation'>Férias</SelectItem>
                </Select>

                <Input 
                    type="file" 
                    accept="png, jpg"
                />
            
            
            <Button color="primary" radius="full" type="submit" >Enviar</Button>
        </form>
    )
}