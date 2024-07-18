"use client";

import type { ChipProps, Selection, SortDescriptor } from "@nextui-org/react";
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
  Tooltip,
} from "@nextui-org/react";
import type { Suppliers } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { ChangeEvent, Key } from "react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown, BiPlus, BiSearch } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import { api } from "~/trpc/react";

type props = {
  supplier: Suppliers[];
};

const column = [
  { name: "ID", uid: "id" },
  { name: "NOME", uid: "fantasy_name" },
  { name: "CNPJ", uid: "cnpj" },
  { name: "EMAIL", uid: "email" },
  { name: "TELEFONE", uid: "phone_number" },
  { name: "STATUS", uid: "status" },
  { name: "AÇÕES", uid: "actions" },
];

const statusOptions = [
  { name: "Ativo", uid: "Ativo" },
  { name: "Inativo", uid: "Inativo" },
  { name: "Férias", uid: "Férias" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  Ativo: "success",
  Inativo: "danger",
  Férias: "warning",
};

export default function SupplierTable({ supplier }: props) {
  const supplierDelete = api.suppliers.delete.useMutation();

  //Linhas da tabela
  const renderCell = useCallback((supplier: Suppliers, columnKey: Key) => {
    const cellValue = supplier[columnKey as keyof Suppliers];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize"
            size="sm"
            color={statusColorMap[supplier.status]}
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar item">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <FaPen
                  onClick={() =>
                    router.push(`/user/fornecedores?id=${supplier.id}`)
                  }
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  async function handleDelete() {
    try {
      const ids = Array.from(selectedKeys);
      await Promise.all(
        ids.map(
          async (id) =>
            await supplierDelete.mutateAsync({ id: parseInt(id as string) }),
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
              onClick={() => router.push("/user/fornecedores?id=0")}
              endContent={<BiPlus size={12} />}
            >
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedKeys,
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    supplier.length,
    hasSearchFilter,
  ]);

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

  return (
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
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="não foi cadastrado nenhum fornecedor"
          items={sortedItems}
        >
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
  );
}
