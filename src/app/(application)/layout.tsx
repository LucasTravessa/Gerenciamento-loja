import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/Header";
import LoginModal from "../_components/Modals/LoginModal";
import SignUpModal from "../_components/Modals/SignUpModal";

export const metadata = {
  title: "Gerenciamento Loja",
  description:
    "Sistema de gerenciamento loja, um sistema onde simula um painel de administrador de uma e-commece, com gerencimento de funcionarios e de forncedores, controle de estoque e de lucro e investimentos",
};

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen flex-col">
      <TestHeader session={session} />
      <LoginModal />
      <SignUpModal />
      {children}
      <footer className="mt-auto flex w-full items-center justify-center border">
        <p className="flex items-center justify-center">
          Powered by Lucas e Pedro
        </p>
      </footer>
    </div>
  );
}
