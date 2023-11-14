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
import type { ChipProps, Selection, SortDescriptor } from "@nextui-org/react";
import { useMemo, useState } from 'react';

type props = {
    id: number
    product: string
    amount: number
    suplier: string
}[]

const column = [
    {name: 'ID', uid: 'id', sortable: true},
    {name: 'Produto', uid: 'product', sortable: true},
    {name: 'Quantidade', uid: 'amount', sortable: true},
    {name: 'Fornecedor', uid: 'suplier', sortable: true},
]



export default function SellsTable({sells}: {sells: props}) {

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
                        <TableRow key={itens.product}>
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