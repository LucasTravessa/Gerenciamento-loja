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
    User,
} from "@nextui-org/react";
import type { ChipProps, Selection, SortDescriptor } from "@nextui-org/react";  
import type { Suppliers } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { ChangeEvent, Key } from "react";
import { useCallback, useMemo, useState } from "react";
import { BiChevronDown, BiDotsVertical, BiPlus, BiSearch } from "react-icons/bi";

  type props = {
    supplier: Suppliers[];
  }

  const column = [
    {name:'ID', uid:'id'},
    {name:'NOME', uid:'name'},
    {name:'CNPJ', uid:'cnpj'},
    {name:'EMAIL', uid:'email'},
    {name:'TELEFONE', uid:'phone_number'},
    {name:'STATUS', uid:'status'},
    {name:'AÇÕES', uid:'actions'},
  ];

  const statusOptions = [
    { name: "Ativo", uid: "active" },
    { name: "Inativo", uid: "inative" },
    { name: "Férias", uid: "vacation" },
  ];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    inative: "danger",
    vacation: "warning",
  };

export default function SupplierTable({supplier}: props) {

    //Linhas da tabela
    const renderCell = useCallback((supplier: Suppliers, columnKey: Key) => {
        const cellValue = supplier[columnKey as keyof Suppliers];
        
        switch(columnKey) {
            case "status":
                return(
                    <Chip
                        className="capitalize"
                        size="sm"
                        color={statusColorMap[supplier.status]}
                    >
                        {cellValue}
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
  
  //filtro
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredSuppliers = [...supplier];

    if (hasSearchFilter) {
      filteredSuppliers = filteredSuppliers.filter((user) =>
        user.fantasy_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredSuppliers = filteredSuppliers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredSuppliers;
  }, [supplier, filterValue, statusFilter]);

  //paginação
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const items = useMemo(() => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos os itens selecionados"
            : `${selectedKeys.size} de ${filteredItems.length} selecionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Próximo
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, selectedKeys]);

  //sorted
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const sortedItems = useMemo(() => {
    return [...items].sort((a: Suppliers, b: Suppliers) => {
      const first = a[sortDescriptor.column as keyof Suppliers] as number;
      const second = b[sortDescriptor.column as keyof Suppliers] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  //parte de cima da tabela

  const router = useRouter();

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procure pelo nome..."
            startContent={<BiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BiChevronDown className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onClick={() => router.push("/fornecedores/?modal=true")} endContent={<BiPlus size={12} />}>
              Novo
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {supplier.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Linhas por página:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    supplier.length,
    hasSearchFilter,
  ]);

    return(
        <div className="w-4/5">
            <Table
                aria-label="Tabela de fornecedores"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                topContent={topContent}
                topContentPlacement="outside"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                  wrapper: "max-h-[382px]",
                }}
            >
                <TableHeader columns={column}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent='não foi cadastrado nenhum fornecedor' items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}