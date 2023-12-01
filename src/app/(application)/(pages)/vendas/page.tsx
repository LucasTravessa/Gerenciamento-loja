import ModalGlobal from "~/app/_components/Modals/Modal";
import SellsTable from "./table";
import { api } from "~/trpc/server";

export default async function Vendas() {
  const sells = await api.sales.getAll.query();

  return (
    <>
      <SellsTable sells={sells} />
      <ModalGlobal>
        <h1 className="text-2xl font-bold">Adicione uma nova venda:</h1>
        
      </ModalGlobal>
    </>
  );
}
