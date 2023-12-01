"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "../Form/RegisterForm/RegisterForm";

export default function SignUpModal() {

    const searchParams = useSearchParams();
    const open = searchParams.get("signup") === "true";
    const router = useRouter();
    const close = () => router.push('/')

    return(
        <Modal isOpen={open} onClose={close}>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <div className="w-full flex flex-col items-center gap-6 justify-center">
                        <h1 className="text-2xl font-bold">Registro</h1>
                        <RegisterForm/>
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}