import SellsTable from "./table"
import { api } from "~/trpc/server"

export default async function Vendas() {

    const sells = await api.sales.getAll.query();

    return(
        <SellsTable sells={sells}/>
    )
}