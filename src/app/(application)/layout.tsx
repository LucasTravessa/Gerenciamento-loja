import { getServerAuthSession } from "~/server/auth";
import RegisterForm from "../_components/Form/RegisterForm/RegisterForm";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";
import ModalGlobal from "../_components/Modals/Modal";

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
      <ModalGlobal>
        <div className="w-full flex flex-col items-center gap-6 justify-center">
          <h1 className="text-2xl font-bold">Registro</h1>
          <RegisterForm/>
        </div>
      </ModalGlobal>
      {children}
    </>
  );
}
