'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import EmployeesForm from "../Form/EmployeesForm/EmployeesForm";

export default function EmployeesModal() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const open = searchParams.get("modal") === "true";

    const close = () => router.push('/funcionarios');

    return(
        <Modal isOpen={open} onClose={close}>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">Adicione um novo funcionario:</h1>
                    <EmployeesForm/>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}