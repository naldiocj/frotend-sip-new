"use client";

import { Badge } from "@/components/reui/badge";
import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/reui/data-grid/data-grid-table";
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
import { useMemo, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { convertData } from "@/lib/date-utils";
import { GroupButtonDocumentos } from "@/components/group-button-documentos";
import { ProcessoDocumentoItem } from "@/lib/dto/processo.dto";

interface iAppProps {
  data: ProcessoDocumentoItem[];
}

export function DocumentosDataTable({ data }: iAppProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const columns = useMemo<ColumnDef<ProcessoDocumentoItem>[]>(
    () => [
      {
        id: "select",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        size: 52,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      {
        accessorKey: "titulo",
        id: "titulo",
        header: ({ column }) => (
          <DataGridColumnHeader title="Título" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium">
            {row.original.titulo}
          </div>
        ),
        size: 260,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "tipo",
        id: "tipo",
        header: ({ column }) => (
          <DataGridColumnHeader title="Tipo" column={column} />
        ),
        cell: ({ row }) => <Badge variant="outline">{row.original.tipo}</Badge>,
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: "descricao",
        id: "descricao",
        header: ({ column }) => (
          <DataGridColumnHeader title="Descrição" column={column} />
        ),
        cell: ({ row }) => (
          <div className="max-w-88 truncate text-sm text-muted-foreground">
            {row.original.descricao || "Sem descrição"}
          </div>
        ),
        size: 340,
      },
      {
        accessorKey: "processoNumero",
        id: "processoNumero",
        header: ({ column }) => (
          <DataGridColumnHeader title="Processo" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground">{row.original.processoNumero}</div>
        ),
        size: 160,
        enableSorting: true,
      },
      {
        accessorKey: "createdAt",
        id: "createdAt",
        header: ({ column }) => (
          <DataGridColumnHeader title="Criado em" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground">
            {convertData(row.original.createdAt)}
          </div>
        ),
        size: 150,
        enableSorting: true,
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <GroupButtonDocumentos
              id={row.original.id}
              url={row.original.url}
            />
          </div>
        ),
        size: 120,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: ProcessoDocumentoItem) => String(row.id),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={data?.length || 0}
      tableLayout={{
        headerSticky: true,
        headerBorder: true,
        rowBorder: true,
        width: "auto",
        columnsResizable: false,
      }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer className="rounded-2xl border-border border bg-background shadow-sm">
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
