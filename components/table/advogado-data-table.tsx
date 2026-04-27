"use client";

import { AddAdvogadoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-advogado-modal";
import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdvogadoListItem, TipoAdvogado } from "@/lib/dto/advogado.dto";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import { use, useMemo, useState } from "react";

const columns: ColumnDef<AdvogadoListItem>[] = [
  {
    id: "nomeCompleto",
    accessorKey: "nomeCompleto",
    header: ({ column }) => (
      <DataGridColumnHeader title="Nome completo" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.nomeCompleto}
      </span>
    ),
    size: 260,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "numeroCedula",
    accessorKey: "numeroCedula",
    header: ({ column }) => (
      <DataGridColumnHeader title="Nº Cédula" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">
        {row.original.numeroCedula}
      </span>
    ),
    size: 170,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "tipoAdvogado",
    accessorKey: "tipoAdvogado",
    header: ({ column }) => (
      <DataGridColumnHeader title="Tipo" column={column} />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.tipoAdvogado === TipoAdvogado.DEFESA
            ? "outline"
            : "secondary"
        }
        className="px-2 py-1 text-[10px] uppercase tracking-wide"
      >
        {row.original.tipoAdvogado === TipoAdvogado.DEFESA
          ? "Defesa"
          : "Acusação"}
      </Badge>
    ),
    size: 140,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "telefone",
    accessorKey: "telefone",
    header: ({ column }) => (
      <DataGridColumnHeader title="Telefone" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">
        {row.original.telefone}
      </span>
    ),
    size: 160,
    enableSorting: true,
  },
];

interface Props {
  promise: Promise<AdvogadoListItem[]>;
}

export function AdvogadoDataTable({ promise }: Props) {
  const data = use(promise);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState<"all" | TipoAdvogado>("all");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "nomeCompleto", desc: false },
  ]);

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((item) => {
      const textMatch =
        term.length === 0 ||
        item.nomeCompleto.toLowerCase().includes(term) ||
        item.numeroCedula.toLowerCase().includes(term) ||
        item.telefone.toLowerCase().includes(term);

      const tipoMatch = tipo === "all" ? true : item.tipoAdvogado === tipo;

      return textMatch && tipoMatch;
    });
  }, [data, search, tipo]);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? row.numeroCedula),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid w-full gap-3 sm:max-w-3xl sm:grid-cols-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, cédula ou telefone..."
          />
          <Select
            value={tipo}
            onValueChange={(v) => setTipo(v as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value={TipoAdvogado.DEFESA}>Defesa</SelectItem>
              <SelectItem value={TipoAdvogado.ACUSACAO}>Acusação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setOpenModal(true)} className="shrink-0">
          <CirclePlus className="h-4 w-4" />
          Registar advogado
        </Button>
      </div>

      <DataGrid
        table={table}
        recordCount={filteredData.length}
        tableLayout={{
          headerSticky: true,
          headerBorder: true,
          rowBorder: true,
          width: "auto",
          columnsResizable: false,
        }}
      >
        <div className="w-full space-y-2.5">
          <DataGridContainer className="rounded-2xl border border-border bg-background shadow-sm">
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>

      <AddAdvogadoModal open={openModal} setOpen={setOpenModal} />
    </>
  );
}

