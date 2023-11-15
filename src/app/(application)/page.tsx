import { signUpRouter } from "~/server/api/routers/signUp";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-white"></main>
  );
}
