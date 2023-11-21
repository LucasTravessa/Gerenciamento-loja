import { api } from "~/trpc/server"
import SupplierTable from "./table"

export default async function Supplier() {

    const supplie = await api.suppliers.getAll.query()

    return(
        <>
            <SupplierTable supplie={supplie}/>
        </>
    )
}