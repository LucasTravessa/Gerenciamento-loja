import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema, type schemaProps } from "./schema";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  async function handleForm(data: schemaProps) {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  }

  return {
    register,
    handleSubmit,
    handleForm,
    errors,
  };
};
