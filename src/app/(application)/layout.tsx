import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";
import { getSession, useSession } from "next-auth/react";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  //   console.log(session);

  return (
    <>
      <TestHeader session={session} />
      <LoginModal />
      {children}
    </>
  );
}
