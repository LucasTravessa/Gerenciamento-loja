import Link from "next/link";
import Navlink from "../Navlink/Navlink";


export default function Header() {
    return (
        <nav className="bg-gray w-full h-[100px] flex justify-around items-center">
            <h2 className="text-4xl font-bold">Nome da loja</h2>

            <Link href=''>
                <Navlink
                    name="Home"
                />
            </Link>

            <Link href=''>
                <Navlink
                    name="Fornecedores"
                />
            </Link>

            <Link href=''>
                <Navlink
                    name="Funcionarios"
                />
            </Link>

            <Link href=''>
                <Navlink
                    name="Vendas"
                />
            </Link>

            <Link href=''>
                <Navlink
                    name="Estoque"
                />
            </Link>
        </nav>
    )
}