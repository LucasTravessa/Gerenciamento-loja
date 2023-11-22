import { api } from "~/trpc/server";
import EmployeesTable from "./table";
import EmployeesForm from "~/app/_components/Form/EmployeesForm/EmployeesForm";
import ModalGlobal from "~/app/_components/Modals/Modal";

export default async function Employees() {
  const employees = await api.employees.getAll.query();

  return (
    <>
      <EmployeesTable employees={employees} />
      <ModalGlobal>
          <h1 className="text-2xl font-bold">Adicione um novo funcionario:</h1>
          <EmployeesForm />
      </ModalGlobal>
    </>
  );
}
