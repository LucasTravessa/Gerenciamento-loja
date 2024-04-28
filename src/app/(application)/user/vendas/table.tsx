"use client";

import {
  Button,
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
  Tooltip,
} from "@nextui-org/react";
import type { Employees, Sales } from "@prisma/client";
import type { Selection, SortDescriptor } from "@nextui-org/react";
import {
  type ChangeEvent,
  type Key,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BiDotsVertical, BiPlus, BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";

type props = {
  sells: Sales[];
  employees: Employees[];
};

const column = [
  { name: "ID", uid: "id" },
  { name: "CLIENTE", uid: "client" },
  { name: "TOTAL", uid: "total" },
  { name: "DATA", uid: "date" },
  { name: "FUNCIONARIO", uid: "employee_id" },
  { name: "AÇÕES", uid: "actions" },
];

export default function SellsTable({ sells, employees }: props) {
  const salesDelete = api.sales.delete.useMutation();

  const renderCell = useCallback((sells: Sales, columnKey: Key) => {
    const cellValue = sells[columnKey as keyof Sales];

    switch (columnKey) {
      case "id":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toString()}
          </p>
        );
      case "client":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue.toString()}
          </p>
        );
      case "total":
        return (
          <p className="text-bold text-small capitalize">
            R${cellValue.toString()}
          </p>
        );
      case "date":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue instanceof Date &&
              cellValue.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
          </p>
        );
      case "employee_id":
        const employee = employees.find(
          (employees) => employees.id === cellValue,
        );
        return (
          <p className="text-bold text-small capitalize">{employee?.name}</p>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar item">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <FaPen
                  onClick={() => router.push(`/user/vendas?id=${sells.id}`)}
                />
              </span>
            </Tooltip>
          </div>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filterValue, setFilterValue] = useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredSuppliers = [...sells];

    if (hasSearchFilter) {
      filteredSuppliers = filteredSuppliers.filter((user) =>
        user.client.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredSuppliers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sells, filterValue]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, page, pages, selectedKeys]);

  //sorted
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const sortedItems = useMemo(() => {
    return [...items].sort((a: Sales, b: Sales) => {
      const first = a[sortDescriptor.column as keyof Sales] as number;
      const second = b[sortDescriptor.column as keyof Sales] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  //parte de cima da tabela

  const router = useRouter();

  async function handleDelete() {
    try {
      const ids = Array.from(selectedKeys);
      await Promise.all(
        ids.map(
          async (id) =>
            await salesDelete.mutateAsync({ id: parseInt(id as string) }),
        ),
      );
      toast.success("Deletado com sucesso!!");
      setSelectedKeys(new Set([]));
      router.refresh();
    } catch (err) {
      // console.log(err);
      toast.error("Erro ao deletar!");
    }
  }

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
            <Button variant="flat" onClick={handleDelete}>
              Apagar
            </Button>
            <Button
              color="primary"
              onClick={() => router.push("/user/vendas/?id=0")}
              endContent={<BiPlus size={12} />}
            >
              Novo
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {sells.length} vendas
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedKeys,
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    sells.length,
    hasSearchFilter,
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
        <TableBody emptyContent="nenhuma venda encontrada" items={sortedItems}>
          {(itens) => (
            <TableRow key={itens.id}>
              {(columnKey) => (
                <TableCell>{renderCell(itens, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
