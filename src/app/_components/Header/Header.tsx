"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  User
} from "@nextui-org/react";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FaLinux } from "react-icons/fa";

type linkProps = {
  id: number;
  path: string;
  name: string;
}[];

const link: linkProps = [
  {
    id: 1,
    path: "/fornecedores",
    name: "Fornecedores",
  },
  {
    id: 2,
    path: "/vendas",
    name: "Vendas",
  },
  {
    id: 3,
    path: "/funcionarios",
    name: "Funcionarios",
  },
  {
    id: 4,
    path: "/estoque",
    name: "Estoque",
  },
];

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  const router = useRouter();
  const activePath = usePathname()
  
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <FaLinux />
          <p className="font-bold text-inherit">SGL</p>
        </Link>
      </NavbarBrand>

      {session ? (
        <NavbarContent justify="center" className="hidden gap-4 sm:flex">
            {link.map((item) => (
            <NavbarItem key={item.id} isActive={activePath === item.path} >
              <Link color="foreground" href={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                className="text-black"
                name={`${session.user.name}`}
                avatarProps={{
                  src: `${session.user.image}`
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <button
            className=" bg-grey_veryLight flex items-center text-black justify-center rounded-md px-3 py-2 text-lg hover:scale-[1.02]"
            onClick={() => router.push("/?login=true")}
          >
            Entrar
          </button>
        </NavbarContent>
      )}
    </Navbar>
  );
}