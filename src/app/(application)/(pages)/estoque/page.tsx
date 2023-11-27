import { api } from "~/trpc/server";
import ProductsTable from "./table";
import ModalGlobal from "~/app/_components/Modals/Modal";
import ProductForm from "~/app/_components/Form/ProductForm/ProductForm";

export default async function Products() {
  const products = await api.products.getAll.query();

  return (
    <>
      <ProductsTable products={products} />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione um novo produto:</h1>
        <ProductForm/>
      </ModalGlobal>
    </>
  );
}
