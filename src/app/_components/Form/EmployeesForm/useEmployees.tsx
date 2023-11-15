import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "~/trpc/server"
import { schema, schemaProps } from "./schema"

export const useEmployees = () => {
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting}
    } = useForm<schemaProps>({
        mode: 'onBlur',
        criteriaMode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            role: '',
            phone: '',
            salary: '',
            address: '',
        }
    })

    async function handleForm(data: schemaProps) {
        console.log(data)

        // const createEmployee = await api.employees.create.mutate(data);
    }

    return {
        register,
        handleSubmit,
        handleForm,
        errors,
        isSubmitting,
    }

}