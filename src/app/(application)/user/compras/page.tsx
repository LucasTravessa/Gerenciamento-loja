import { api } from "~/trpc/server";
import PurchasesTable from "./table";
import PurchasesForm from "~/app/_components/Form/PurchasesForm/PurchasesForm";
import ModalGlobal from "~/app/_components/Modals/Modal";

export default async function Purchases() {
  type IPurchases = {
    id: number;
    supplier_id: number;
    total: number;
    date: Date;
    status: string;
    purchace_details: {
      products_name: string;
      products_amount: number;
      price: number;
    }[];
  }[];

  const purchases = await api.purchases.getAll.query();
  const supplier = await api.suppliers.getAll.query();

  return (
    <>
      <PurchasesTable
        suppliers={supplier}
        purchases={purchases as IPurchases}
      />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione uma nova Compra:</h1>
        <PurchasesForm />
      </ModalGlobal>
    </>
  );
}
