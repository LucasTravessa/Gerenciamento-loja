import { api } from "~/trpc/server"
import SupplierTable from "./table"
import ModalGlobal from "~/app/_components/Modals/Modal"
import SupplierForm from "~/app/_components/Form/SupplierForm/SupplierForm"

export default async function Supplier() {

    const supplie = await api.suppliers.getAll.query()

    return(
        <>
            <SupplierTable supplier={supplie}/>
            <ModalGlobal>
                <h1 className="text-2xl font-bold">Adicione um novo fornecedor:</h1>
                <SupplierForm/>
            </ModalGlobal>
        </>
    )
}