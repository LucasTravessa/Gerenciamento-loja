
import Header from "~/app/_components/Header/Header";
import LoginModal from "~/app/_components/Modals/LoginModal";
import { api } from "~/trpc/server";

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-white">
      
      <LoginModal />
    </main>
  );
}
