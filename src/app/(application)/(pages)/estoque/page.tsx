import { api } from "~/trpc/server";
import ProductsTable from "./table";

export default async function Products() {
  const products = await api.products.getAll.query();

  return (
    <>
      <ProductsTable products={products} />
    </>
  );
}
