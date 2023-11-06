import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { schema, schemaProps } from './schema'

export const useLogin = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<schemaProps>({
        mode: "onBlur",
        criteriaMode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // handleform: requisição para o back

    return {
        register,
        errors,
        isSubmitting,
    }
}