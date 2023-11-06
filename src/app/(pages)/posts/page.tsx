import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "~/app/_components/Header/Header";
import LoginModal from "~/app/_components/Modals/LoginModal";
import SideBar from "~/app/_components/Sidebar/Sidebar";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Posts() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Header session={session} />
      <SideBar />
      <LoginModal />
    </main>
  );
}
