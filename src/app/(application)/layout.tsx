import { getServerAuthSession } from "~/server/auth";
import RegisterForm from "../_components/Form/RegisterForm/RegisterForm";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";
import ModalGlobal from "../_components/Modals/Modal";
import SignUpModal from "../_components/Modals/SignUpModal";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <>
      <TestHeader session={session} />
      <LoginModal />
      <SignUpModal/>
      {children}
    </>
  );
}
