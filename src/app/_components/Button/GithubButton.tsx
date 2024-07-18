"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

export default function GithubButton() {
  const handleClick = () => {
    signIn("github", { callbackUrl: "http://localhost:3000/" });
  };

  return (
    <Button radius="full" size="md" onClick={handleClick}>
      <BsGithub /> Entrar com Github
    </Button>
  );
}
