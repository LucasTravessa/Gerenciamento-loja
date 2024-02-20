"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ModalGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const atualPath = usePathname();

  const open = searchParams.get("id") ? true : false;

  const close = () => router.push(`${atualPath}`);

  return (
    <Modal
      isOpen={open}
      onClose={close}
      className="max-w-[70%] overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
    >
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
