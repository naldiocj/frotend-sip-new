"use client";

import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AdvogadoListItem, TipoAdvogado } from "@/lib/dto/advogado.dto";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { use, useState } from "react";

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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "nomeCompleto", desc: false },
  ]);

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? row.numeroCedula),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <DataGrid
        table={table}
        recordCount={data.length}
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
    </>
  );
}

