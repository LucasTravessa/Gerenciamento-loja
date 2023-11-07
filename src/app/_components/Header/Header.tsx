"use client";

// import components
import { User } from "@nextui-org/react";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";

//import hooks
import { useLogin } from "~/store/useLogin";

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  const setLogin = useLogin((state) => state.toggleLogin);
  const router = useRouter();

  if (session) {
    return (
      <nav className="flex h-[100px] w-full items-center justify-between bg-primary px-4">
        <div className="bg-grey_veryLight flex h-[50px] w-[150px] items-center justify-center rounded-md">
          <h2 className="text-2xl font-bold">Logo</h2>
        </div>
        <div className="bg-grey_veryLight flex items-center justify-center rounded-md px-3 py-2">
          <User
            name={`${session.user?.name}`}
            avatarProps={{
              src: `${session.user?.image}`,
            }}
          />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="flex h-[100px] w-full items-center justify-between bg-primary px-4">
        <div className="bg-grey_veryLight flex h-[50px] w-[150px] items-center justify-center rounded-md">
          <h2 className="text-2xl font-bold">Logo</h2>
        </div>
        <div className="flex gap-6">
          <button className=" bg-grey_veryLight flex items-center justify-center rounded-md px-3 py-2 text-lg hover:scale-[1.02]">
            Register
          </button>
          <button
            className=" bg-grey_veryLight flex items-center justify-center rounded-md px-3 py-2 text-lg hover:scale-[1.02]"
            onClick={() => router.push("/?login=true")}
          >
            Login
          </button>
        </div>
      </nav>
    );
  }
}
