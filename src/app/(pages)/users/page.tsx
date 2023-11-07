import { api } from "~/trpc/server";
import UsersTable from "./table";

export default async function Users() {
  const users = await api.users.getAll.query();

  return <UsersTable info={users} />;
}
