import { api } from "~/trpc/server";
import EmployeesTable from "./table";
import { faker } from "@faker-js/faker";
import EmployeesModal from "~/app/_components/Modals/EmployeesModal";
import { schemaProps } from "~/app/_components/Form/EmployeesForm/schema";
import EmployeesForm from "~/app/_components/Form/EmployeesForm/EmployeesForm";

const employee = {
  status: "vacation",
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  phone_number: faker.phone.number(),
  role: faker.person.jobTitle(),
  salary: parseFloat(faker.finance.amount()),
  img: `https://i.pravatar.cc/150?u=${faker.string.alpha(10)}`,
};



export default async function Employees() {
  const employees = await api.employees.getAll.query();

  // await api.employees.create.mutate(employee);

  return (
    <>
      <EmployeesTable employees={employees} />
      <EmployeesModal />
    </>
  );
}
