'use client';

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
} from "@nextui-org/react";
import type { Purchases } from "@prisma/client";

type props = {
    purchases: Purchases[],
}

export default function PurchasesTable({purchases}: props) {
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