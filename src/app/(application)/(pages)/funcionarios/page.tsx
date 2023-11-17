import { api } from "~/trpc/server";
import EmployeesTable from "./table";
import { faker } from "@faker-js/faker";
import EmployeesModal from "~/app/_components/Modals/EmployeesModal";

export default async function Employees() {
  const employees = await api.employees.getAll.query();

  return (
    <>
      <EmployeesTable employees={employees} />
      <EmployeesModal />
    </>
  );
}
