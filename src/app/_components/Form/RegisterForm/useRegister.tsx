import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { schema, type schemaProps } from "./schema";
import { signIn } from "next-auth/react";

export function useRegister() {
  const addUser = api.signup.signup.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaProps>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  async function handleRegister(data: schemaProps) {
    const user = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    await addUser.mutateAsync(user);

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  }

  return {
    register,
    handleRegister,
    handleSubmit,
    errors,
  };
}
