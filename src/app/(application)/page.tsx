import { signUpRouter } from "~/server/api/routers/signUp";
import { api } from "~/trpc/server";

export default async function Home() {
  // await api.signup.signup.mutate({
  //   name: "lucas",
  //   email: "lucas@gmail.com",
  //   password: "123456a",
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-white"></main>
  );
}
