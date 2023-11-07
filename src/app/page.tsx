import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "~/app/_components/Header/Header";
import LoginModal from "~/app/_components/Modals/LoginModal";
import SideBar from "~/app/_components/Sidebar/Sidebar";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import TestHeader from "./_components/Header/TestHeader";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#636363] to-[#d3d3d3] text-white">
      <TestHeader session={session} />
      
      <LoginModal />
    </main>
  );
}
