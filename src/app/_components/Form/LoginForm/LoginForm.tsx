//component
import { Button, Input } from "@nextui-org/react";

//hooks
import { useState } from "react";
import { useLogin } from "./useLogin";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
  const { register, handleSubmit, handleForm, errors } = useLogin();
  const [show, setShow] = useState(true);

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleForm)}>
        <Input
          type="email"
          label="Email"
          size="sm"
          {...register("email")}
          errorMessage={errors.email?.message}
          color={errors.email ? "danger" : "default"}
          isClearable
        />
        <Input
          label="Senha"
          size="sm"
          {...register("password")}
          errorMessage={errors.password?.message}
          color={errors.password ? "danger" : "default"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <AiOutlineEye className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <AiOutlineEyeInvisible className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={show ? "password" : "text"}
        />
        <Button radius="full" size="md" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
