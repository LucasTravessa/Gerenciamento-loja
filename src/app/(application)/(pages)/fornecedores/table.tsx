import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
  } from "@nextui-org/react";

  type props = {
    id: number;
    fantasy_name: string;
    cnpj: string;
    email: string;
    address: string;
    phone_number: string;
    status: string;
  }[]

export default function SupplierTable({supplie}: {supplie: props}) {
    return(
        <Table>
            <TableHeader>
                <TableColumn>

                </TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>

                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}