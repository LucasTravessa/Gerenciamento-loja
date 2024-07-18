"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import GithubButton from "../Button/GithubButton";
import GoogleButton from "../Button/GoogleButton";
import LoginForm from "../Form/LoginForm/LoginForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const searchParams = useSearchParams();
  const open = searchParams.get("login") === "true";

  const router = useRouter();

  const onClose = () => router.push("/");

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <LoginForm />
          <h1>Ou</h1>
          <GoogleButton />
          <GithubButton />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
