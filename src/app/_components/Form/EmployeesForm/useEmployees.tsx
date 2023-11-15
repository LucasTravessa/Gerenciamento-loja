import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

    async function handleForm() {
        
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
    }

}