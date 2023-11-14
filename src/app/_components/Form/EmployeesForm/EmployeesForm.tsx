import { Button, Input } from "@nextui-org/react";
import { useEmployees } from "./useEmployees";
import { Dropdown, DropdownItem, DropdownMenu,DropdownTrigger,} from '@nextui-org/react'
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function EmployeesForm() {

    const {register, errors, isSubmitting} = useEmployees();
    const [status, setStatus] = useState<string>('')

    return(
        <form className="flex flex-col justify-center items-center gap-4">
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

            <Input 
                label='Cargo' 
                type="text" 
                {...register('job')}
                color={`${errors.job ? 'danger' : 'default'}`}
                errorMessage={errors.job && `${errors.job.message}`}
            />

            <Input 
                label='Telefone' 
                type="text" 
                {...register('phone')}
                color={`${errors.phone ? 'danger' : 'default'}`}
                errorMessage={errors.phone && `${errors.phone.message}`}
            />

            <div className="flex items-center gap-2">
                <Input 
                    type="text"
                    label='status'
                    value={status} 
                    isDisabled
                />

                <Dropdown>
                    <DropdownTrigger>
                        <Button endContent={<FaChevronDown/>}>Selecione</Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem onAction={() => setStatus('Ativo')}>Ativo</DropdownItem>
                        <DropdownItem onAction={() => setStatus('Inativo')}>Inativo</DropdownItem>
                        <DropdownItem onAction={() => setStatus('Férias')}>Férias</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            
            <Button color="primary" radius="full" type="submit" >Enviar</Button>
        </form>
    )
}