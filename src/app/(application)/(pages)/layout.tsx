import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

type layoutProps = {
  children: ReactNode;
};

export default async function LayoutAuth({ children }: layoutProps) {
  const session = await getServerAuthSession();

   if (!session) {
      redirect("/");
    }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      {children}
    </div>
  );
}
