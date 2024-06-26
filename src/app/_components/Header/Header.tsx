"use client";

//navbar
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
  User,
  Button,
} from "@nextui-org/react";

//type
import type { Session } from "next-auth";

//auth func
import { signOut } from "next-auth/react";

//hooks
import { usePathname, useRouter } from "next/navigation";

//icons
import { FaLinux, FaSignOutAlt } from "react-icons/fa";
import DarkModeButton from "../Button/DarkModeButton";

type linkProps = {
  id: number;
  path: string;
  name: string;
}[];

const link: linkProps = [
  {
    id: 1,
    path: "/user/fornecedores",
    name: "Fornecedores",
  },
  {
    id: 2,
    path: "/user/vendas",
    name: "Vendas",
  },
  {
    id: 3,
    path: "/user/funcionarios",
    name: "Funcionarios",
  },
  {
    id: 4,
    path: "/user/estoque",
    name: "Estoque",
  },
  {
    id: 5,
    path: "/user/compras",
    name: "Compras",
  },
];

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  const router = useRouter();
  const activePath = usePathname();

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
            <NavbarItem key={item.id} isActive={activePath === item.path}>
              <Link color="foreground" href={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name={`${session.user.name}`}
                description="administrador geral"
                avatarProps={{
                  src: `${session.user.image}`,
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="signout" onAction={() => signOut()}>
                <div className="flex items-center justify-center gap-3">
                  <FaSignOutAlt className="text-xl text-red-500" />{" "}
                  <p className="font-bold">Signout</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Button className="" onClick={() => router.push("/?signup=true")}>
            Registro
          </Button>
          <Button className="" onClick={() => router.push("/?login=true")}>
            Entrar
          </Button>
        </NavbarContent>
      )}

      <DarkModeButton />
    </Navbar>
  );
}
