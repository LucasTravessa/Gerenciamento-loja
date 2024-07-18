"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

export default function GoogleButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };

  return (
    <Button radius="full" size="md" onClick={handleClick}>
      <BsGoogle /> Entrar com Google
    </Button>
  );
}
