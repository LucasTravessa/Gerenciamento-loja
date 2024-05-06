import ModalGlobal from "~/app/_components/Modals/Modal";
import SellsTable from "./table";
import { api } from "~/trpc/server";
import SalesForm from "~/app/_components/Form/SalesForm/SalesForm";

export default async function Sells() {
  const sells = await api.sales.getAll.query();
  const employees = await api.employees.getAll.query();

  return (
    <>
      <SellsTable employees={employees} sells={sells} />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione uma nova venda:</h1>
        <SalesForm />
      </ModalGlobal>
    </>
  );
}
