import { Button, Input } from "@nextui-org/react";
import { useEmployees } from "./useEmployees";
import { Select, SelectItem } from '@nextui-org/react'

export default async function EmployeesForm() {

    const {register, errors, isSubmitting, handleSubmit, handleForm} = useEmployees();

    return(
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit(handleForm)}>

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
                    {...register('phone_number')}
                    color={`${errors.phone_number ? 'danger' : 'default'}`}
                    errorMessage={errors.phone_number && `${errors.phone_number.message}`}
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
                    startContent='R$'
                    type="number"
                    {...register('salary')}
                    color={`${errors.salary ? 'danger' : 'default'}`}
                    errorMessage={errors.salary && `${errors.salary.message}`}
                />
            </div>

                <Select 
                    label='Selecione o Status'
                    {...register('status')}
                    color={`${errors.status ? 'danger' : 'default'}`}
                >
                    <SelectItem key='Ativo'>Ativo</SelectItem>
                    <SelectItem key='Inativo'>Inativo</SelectItem>
                    <SelectItem key='Férias'>Férias</SelectItem>
                </Select>

                {/*#TODO input de enviar imagem */}
                {/* <Input 
                    type="file" 
                    accept="png, jpg"
                /> */}
            
            
            <Button color="primary" radius="full" type="submit" >Enviar</Button>
        </form>
    )
}