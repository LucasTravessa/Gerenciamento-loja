"use client";

import {
  Button,
  Chip,
  type ChipProps,
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
import type { Selection, SortDescriptor } from "@nextui-org/react";
import {
  type ChangeEvent,
  type Key,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  BiChevronDown,
  BiDotsVertical,
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import { useRouter } from "next/navigation";

type props = {
  purchases: Purchases[];
};

const column = [
  { name: "ID", uid: "id" },
  { name: "ID FORNECEDOR", uid: "supplier_id" },
  { name: "TOTAL", uid: "total" },
  { name: "DATA", uid: "data" },
  { name: "STATUS", uid: "status" },
  { name: "AÇÕES", uid: "actions" },
];

const statusOptions = [
  { name: "Entrege", uid: "done" },
  { name: "Atrasada", uid: "later" },
  { name: "Pendente", uid: "pendent" },
  { name: "Cancelada", uid: "canceled" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  done: "success",
  later: "danger",
  pendent: "warning",
  canceled: "danger",
};

export default function PurchasesTable({ purchases }: props) {
  //Linhas da tabela
  const renderCell = useCallback((purchases: Purchases, columnKey: Key) => {
    const cellValue = purchases[columnKey as keyof Purchases];

    switch (columnKey) {
      case "id":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toString()}
          </p>
        );
      case "supplier_id":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toString()}
          </p>
        );
      case "total":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toString()}
          </p>
        );
      case "date":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toLocaleString("pt-BR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </p>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            size="sm"
            color={statusColorMap[purchases.status]}
          >
            {cellValue.toString()}
          </Chip>
        );
      case "actions":
        return (
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
        );
    }
  }, []);

  //Filtros
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredPurchases = [...purchases];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPurchases = filteredPurchases.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredPurchases;
  }, [purchases, filterValue, statusFilter]);

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
    return [...items].sort((a: Purchases, b: Purchases) => {
      const first = a[sortDescriptor.column as keyof Purchases] as number;
      const second = b[sortDescriptor.column as keyof Purchases] as number;
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
            <Button
              color="primary"
              onClick={() => router.push("/user/compras?modal=true")}
              endContent={<BiPlus size={12} />}
            >
              Novo
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {purchases.length} users
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
    purchases.length,
    hasSearchFilter,
    selectedKeys,
  ]);

  return (
    <div className="w-4/5">
      <Table
        aria-label="Tabela de vendas"
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
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="não foi cadastrado nenhuma compra"
          items={sortedItems}
        >
          {(items) => (
            <TableRow key={items.id}>
              {(columnKey) => (
                <TableCell>{renderCell(items, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
