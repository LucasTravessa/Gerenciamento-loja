'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmployeesForm from "../Form/EmployeesForm/EmployeesForm";

export default function EmployeesModal() {

    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    const open = searchParams.get("modal") === "true";

    const close = () => router.push(`${path}`);

    return(
        <Modal isOpen={open} onClose={close}>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <EmployeesForm/>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}