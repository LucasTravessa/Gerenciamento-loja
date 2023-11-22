import { api } from "~/trpc/server"
import SupplierTable from "./table"
import ModalGlobal from "~/app/_components/Modals/Modal"

export default async function Supplier() {

    const supplie = await api.suppliers.getAll.query()

    return(
        <>
            <SupplierTable supplier={supplie}/>
            <ModalGlobal>
                
            </ModalGlobal>
        </>
    )
}