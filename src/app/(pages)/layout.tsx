import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import TestHeader from "../_components/Header/TestHeader";

type layoutProps = {
  children: ReactNode;
};

export default async function LayoutHome({ children }: layoutProps) {
  const session = await getServerAuthSession();

  //   if (!session) {
  //     redirect("/");
  //   }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <TestHeader session={session} />
      {children}
    </div>
  );
}
