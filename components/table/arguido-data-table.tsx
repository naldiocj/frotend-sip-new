"use client";

import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArguidoListItem } from "@/lib/dto/arguido.dto";
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

const columns: ColumnDef<ArguidoListItem>[] = [
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
    size: 240,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "numeroBi",
    accessorKey: "numeroBi",
    header: ({ column }) => <DataGridColumnHeader title="Nº BI" column={column} />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">
        {row.original.numeroBi}
      </span>
    ),
    size: 160,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "estadoCivil",
    accessorKey: "estadoCivil",
    header: ({ column }) => (
      <DataGridColumnHeader title="Estado civil" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {row.original.estadoCivil}
      </span>
    ),
    size: 140,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "profissao",
    accessorKey: "profissao",
    header: ({ column }) => (
      <DataGridColumnHeader title="Profissão" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.profissao || "—"}
      </span>
    ),
    size: 180,
    enableSorting: true,
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
    size: 150,
    enableSorting: true,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => <DataGridColumnHeader title="Email" column={column} />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.email || "—"}</span>
    ),
    size: 230,
  },
];

interface Props {
  promise: Promise<ArguidoListItem[]>;
}

export function ArguidoDataTable({ promise }: Props) {
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
    getRowId: (row) => String(row.id ?? row.numeroBi),
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

