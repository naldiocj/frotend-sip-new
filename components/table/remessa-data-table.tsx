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
import { convertData } from "@/lib/date-utils";
import { Remessa } from "@/lib/dto/remessa.dto";
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

const columns: ColumnDef<Remessa>[] = [
  {
    id: "codigoRastreio",
    accessorKey: "codigoRastreio",
    header: ({ column }) => (
      <DataGridColumnHeader title="Código" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-foreground">
        {row.original.codigoRastreio}
      </span>
    ),
    size: 150,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "origem",
    accessorKey: "origem",
    header: ({ column }) => (
      <DataGridColumnHeader title="Origem" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.origem}</span>
    ),
    size: 200,
    enableSorting: true,
  },
  {
    id: "destino",
    accessorKey: "destino",
    header: ({ column }) => (
      <DataGridColumnHeader title="Destino" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.destino}</span>
    ),
    size: 200,
    enableSorting: true,
  },
  {
    id: "dataEnvio",
    accessorKey: "dataEnvio",
    header: ({ column }) => (
      <DataGridColumnHeader title="Data Envio" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-foreground">
        {convertData(row.original.dataEnvio as any)}
      </span>
    ),
    size: 150,
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataGridColumnHeader title="Estado" column={column} />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "RECEBIDO"
              ? "secondary"
              : status === "EM_TRANSITO"
                ? "outline"
                : "default"
          }
          className="px-2 py-1 text-[10px] uppercase tracking-wide"
        >
          {status === "RECEBIDO"
            ? "Recebido"
            : status === "EM_TRANSITO"
              ? "Em trânsito"
              : "Pendente"}
        </Badge>
      );
    },
    size: 140,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "responsavelEnvio",
    accessorKey: "responsavelEnvio",
    header: ({ column }) => (
      <DataGridColumnHeader title="Responsável" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.responsavelEnvio}
      </span>
    ),
    size: 200,
    enableSorting: true,
  },
];

interface Props {
  promise: Promise<Remessa[]>;
}

export function RemessaDataTable({ promise }: Props) {
  const data = use(promise);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "dataEnvio", desc: true },
  ]);

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? row.codigoRastreio),
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