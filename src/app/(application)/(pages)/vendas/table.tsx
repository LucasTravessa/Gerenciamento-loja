'use client';

import { 
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from '@nextui-org/react'
import type { Sales } from "@prisma/client";
import type { ChipProps, Selection, SortDescriptor } from "@nextui-org/react";
import { useMemo, useState } from 'react';

type props = {
    sells: Sales[],
};

const column = [
    {name: 'ID', uid: 'id',},
    {name: 'CLIENTE', uid: 'client',},
    {name: 'TOTAL', uid: 'total',},
    {name: 'DATA', uid: 'data',},
    {name: 'ID FUNCIONARIO', uid: 'employee_id',},
];

export default function SellsTable({sells}: props) {

    return(
        <div className='w-4/5'>
            <Table>
                <TableHeader columns={column}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                        >
                        {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={'no users found'} items={sells}>
                    {(itens) => (
                        <TableRow key={itens.id}>
                            {(columnKey) => (
                                <TableCell>{getKeyValue(itens, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}