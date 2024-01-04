import { api } from "~/trpc/server";
import PurchasesTable from "./table";
import PurchasesForm from "~/app/_components/Form/PurchasesForm/PurchasesForm";
import ModalGlobal from "~/app/_components/Modals/Modal";

export default async function Purchases() {
  const purchases = await api.purchases.getAll.query();

  return (
    <>
      <PurchasesTable purchases={purchases} />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione uma nova Compra:</h1>
        <PurchasesForm />
      </ModalGlobal>
    </>
  );
}
