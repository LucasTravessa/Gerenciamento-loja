"use client";

import Cookies from "js-cookie";
import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";
import SignUpModal from "../_components/Modals/SignUpModal";
import { useSession } from "next-auth/react";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  Cookies.set("session", status);

  return (
    <>
      <TestHeader session={session} />
      <LoginModal />
      <SignUpModal />
      {children}
    </>
  );
}
