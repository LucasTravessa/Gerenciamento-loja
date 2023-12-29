import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { schema, type schemaProps } from "./schema";

export function useRegister() {
  const router = useRouter();
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

  function handleRegister(data: schemaProps) {
    const user = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    addUser.mutate(user);
    router.push("/");
  }

  return {
    register,
    handleRegister,
    handleSubmit,
    errors,
  };
}
