'use client';

import {
    Button,
    Chip,
    ChipProps,
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
import { Key, useCallback, useMemo, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";

type props = {
    purchases: Purchases[],
};

const column = [
    {name:'ID', uid:'id'},
    {name:'ID FORNECEDOR', uid:'supplier_id'},
    {name:'TOTAL', uid:'total'},
    {name:'DATA', uid:'data'},
    {name:'STATUS', uid:'status'},
    {name:'AÇÕES', uid:'actions'},
];

const statusOptions = [
    { name: "Entrege", uid: "done" },
    { name: "Atrasada", uid: "later" },
    { name: "Pendente", uid: "pendent" },
    { name: "Cancelada", uid: "canceled"},
  ];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    done: "success",
    later: "danger",
    pendent: "warning",
    canceled: "danger",
  };

export default function PurchasesTable({purchases}: props) {

    //Linhas da tabela
    const renderCell = useCallback((purchases: Purchases, columnKey: Key) => {
        const cellValue = purchases[columnKey as keyof Purchases];
        
        switch(columnKey) {
            case "status":
                return(
                    <Chip
                        className="capitalize"
                        size="sm"
                        color={statusColorMap[purchases.status]}
                    >
                        {cellValue.toString()}
                    </Chip>
                );
            case "actions":
                return(
                    <div className="relative flex items-center justify-center gap-2">
                        <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <BiDotsVertical size={15} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>Visualizar</DropdownItem>
                            <DropdownItem>Editar</DropdownItem>
                            <DropdownItem>Deletar</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                )
        }
    },[]);

    return(
        <Table>
            <TableHeader columns={column}>
                {(column) => (
                    <TableColumn key={column.uid}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent='não foi cadastrado nenhum fornecedor' items={purchases}>
                {(items) => (
                    <TableRow key={items.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(items, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}