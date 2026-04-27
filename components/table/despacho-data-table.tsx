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
import { Despacho } from "@/lib/dto/despacho.dto";
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

const columns: ColumnDef<Despacho>[] = [
  {
    id: "numeroProcesso",
    accessorKey: "numeroProcesso",
    header: ({ column }) => (
      <DataGridColumnHeader title="Processo" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-foreground">
        {row.original.numeroProcesso}
      </span>
    ),
    size: 170,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "decisao",
    accessorKey: "decisao",
    header: ({ column }) => (
      <DataGridColumnHeader title="Decisão" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.decisao}</span>
    ),
    size: 260,
    enableSorting: true,
  },
  {
    id: "autoridadeResponsavel",
    accessorKey: "autoridadeResponsavel",
    header: ({ column }) => (
      <DataGridColumnHeader title="Autoridade" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.autoridadeResponsavel}
      </span>
    ),
    size: 220,
    enableSorting: true,
  },
  {
    id: "dataDespacho",
    accessorKey: "dataDespacho",
    header: ({ column }) => (
      <DataGridColumnHeader title="Data" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-foreground">
        {convertData(row.original.dataDespacho as any)}
      </span>
    ),
    size: 160,
    enableSorting: true,
  },
  {
    id: "isFinalizado",
    accessorKey: "isFinalizado",
    header: ({ column }) => (
      <DataGridColumnHeader title="Estado" column={column} />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.isFinalizado ? "secondary" : "outline"}
        className="px-2 py-1 text-[10px] uppercase tracking-wide"
      >
        {row.original.isFinalizado ? "Finalizado" : "Pendente"}
      </Badge>
    ),
    size: 140,
    enableSorting: true,
    enableHiding: false,
  },
];

interface Props {
  promise: Promise<Despacho[]>;
}

export function DespachoDataTable({ promise }: Props) {
  const data = use(promise);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "dataDespacho", desc: true },
  ]);

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? `${row.numeroProcesso}-${row.dataDespacho}`),
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

