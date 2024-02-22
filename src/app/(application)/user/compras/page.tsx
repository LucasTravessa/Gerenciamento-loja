import { api } from "~/trpc/server";
import PurchasesTable from "./table";
import PurchasesForm from "~/app/_components/Form/PurchasesForm/PurchasesForm";
import ModalGlobal from "~/app/_components/Modals/Modal";

export default async function Purchases() {
  const purchases = await api.purchases.getAll.query();
  const supplier = await api.suppliers.getAll.query();
  const product = await api.products.getAll.query();

  return (
    <>
      <PurchasesTable
        product={product}
        suppliers={supplier}
        purchases={purchases}
      />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione uma nova Compra:</h1>
        <PurchasesForm />
      </ModalGlobal>
    </>
  );
}
