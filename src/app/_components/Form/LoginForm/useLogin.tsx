import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { schema, schemaProps } from './schema'
import { useRouter } from 'next/navigation'
import { api } from '~/trpc/react'

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

    const router = useRouter();
    const requestUser = api.signup.signup.useMutation();

    function handleForm(data: schemaProps) {

        console.log(data)
    }

    return {
        register,
        handleSubmit,
        handleForm,
        errors,
        isSubmitting,
    }
}