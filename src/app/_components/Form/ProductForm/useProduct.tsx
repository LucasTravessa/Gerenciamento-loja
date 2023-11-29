import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { schema, schemaProps } from "./schema"

export const useProduct = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm({
        mode: 'onBlur',
        criteriaMode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            price: '',
            on_stock: '',
        }
    });

    function handleCreation(data: schemaProps) {
        console.log({...data, price: parseInt(data.price), on_stock: parseInt(data.on_stock)})
    }

    return {
        register,
        handleSubmit,
        handleCreation,
        errors,
    }
}