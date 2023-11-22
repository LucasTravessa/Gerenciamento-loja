"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ModalGlobal({children}: {children: React.ReactNode}) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const atualPath = usePathname();

    const open = searchParams.get("modal") === "true";

    const close = () => router.push(`${atualPath}`);

    return(
        <Modal isOpen={open} onClose={close}>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}