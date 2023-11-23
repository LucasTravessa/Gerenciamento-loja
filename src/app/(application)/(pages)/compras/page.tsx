import { api } from "~/trpc/server";
import PurchasesTable from "./table";

export default async function Purchases() {

    const purchases = await api.purchases.getAll.query();

    return(
        <PurchasesTable purchases={purchases}/>
    )
}