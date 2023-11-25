import { api } from "~/trpc/server";
import ProductsTable from "./table";

export default function Products() {

    const products = api.products.getAll.query();

    return(
        <>
            <ProductsTable products={products}/>
        </>
    )
}