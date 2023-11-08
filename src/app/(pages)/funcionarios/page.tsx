import { api } from "~/trpc/server";
import EmployeesTable from "./table";

export default async function Employees() {
  const employees = await api.employees.getAll.query();

  return <EmployeesTable info={employees} />;
}
