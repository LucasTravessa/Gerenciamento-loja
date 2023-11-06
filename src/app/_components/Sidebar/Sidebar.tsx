import Link from "next/link";
import type { ReactNode } from "react";

//import icons
import { BiSolidBox, BiSolidHome, BiSolidUser } from "react-icons/bi";
import { FaMoneyBill, FaPeopleCarry } from "react-icons/fa";

type linkProps = {
  id?: number;
  icon?: ReactNode;
  path?: string;
  name?: string;
}[];

const link: linkProps = [
  {
    id: 1,
    icon: <BiSolidHome />,
    path: "/pages/Home",
    name: "Home",
  },
  {
    id: 2,
    icon: <FaPeopleCarry />,
    path: "/pages/Fornecedores",
    name: "Fornecedores",
  },
  {
    id: 3,
    icon: <FaMoneyBill />,
    path: "/pages/Vendas",
    name: "Vendas",
  },
  {
    id: 4,
    icon: <BiSolidUser />,
    path: "/pages/Funcionarios",
    name: "Funcionarios",
  },
  {
    id: 5,
    icon: <BiSolidBox />,
    path: "/pages/Estoque",
    name: "Estoque",
  },
];

export default function SideBar() {
  return (
    <div className="bg-paperBackground flex h-[1000px] w-[150px] flex-col pl-3">
      {link.map((l) => {
        return (
          <div key={l.id} className="">
            <Link href={`${l.path}`}>
              <li
                className={`flex list-none items-center gap-2 text-lg font-normal hover:scale-[1.02]`}
              >
                <div className="text-primaryLight">{l.icon}</div>
                <div className="text-grey_veryDark">{l.name}</div>
              </li>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
