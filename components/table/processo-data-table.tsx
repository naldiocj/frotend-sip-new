"use client";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  convertData,
  convertEstadoProcessoToNormalCase,
  getBageEstadoProcesso,
  toUpperCase,
} from "@/lib/date-utils";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { replaceAllChar } from "@/lib/utils-func";
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
import { EllipsisVertical, FolderOpenDot, Trash } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import BadgeTipoProcesso from "./badge-tipo-processo";

/* ─── Column definitions ─────────────────────────────────────────────────── */

const columns: ColumnDef<ProcessoListItem>[] = [
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
    id: "numero",
    accessorKey: "numero",
    header: ({ column }) => (
      <DataGridColumnHeader title="Número" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-foreground">
        {row.original.numero}
      </span>
    ),
    size: 180,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "tipoProcesso",
    accessorKey: "tipoProcesso",
    header: ({ column }) => (
      <DataGridColumnHeader title="Tipo" column={column} />
    ),
    cell: ({ row }) => (
      <BadgeTipoProcesso tipoProcesso={row.original.tipoProcesso} />
    ),
    size: 150,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "estadoProcesso",
    accessorKey: "estadoProcesso",
    header: ({ column }) => (
      <DataGridColumnHeader title="Estado" column={column} />
    ),
    cell: ({ row }) => (
      <Badge
        variant={getBageEstadoProcesso(row.original.estadoProcesso) as any}
        className="px-2 py-1 text-[10px] uppercase tracking-wide"
      >
        {toUpperCase(
          convertEstadoProcessoToNormalCase(row.original.estadoProcesso),
        )}
      </Badge>
    ),
    size: 160,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "descricao",
    accessorKey: "descricao",
    header: ({ column }) => (
      <DataGridColumnHeader title="Descrição" column={column} />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate text-sm text-muted-foreground">
        {row.original.descricao || "—"}
      </div>
    ),
    size: 300,
    enableSorting: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataGridColumnHeader title="Data de Registo" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-foreground">
        {convertData(row.original.createdAt)}
      </span>
    ),
    size: 160,
    enableSorting: true,
  },
  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={`${INSTRUTOR_PATHS.PROCESSOS}/${replaceAllChar(row.original.numero, "/", "-")}`}
                >
                  <FolderOpenDot className="h-4 w-4" />
                  Abrir
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash className="h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    size: 60,
    enableSorting: false,
    enableHiding: false,
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

interface iAppProps {
  promise: Promise<ProcessoListItem[]>;
}

export function ProcessoDataTable({ promise }: iAppProps) {
  const data = use(promise);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: { pagination, sorting },
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
        <DataGridContainer className="rounded-2xl border border-border bg-background shadow-sm">
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

export function SkeletonProcessDataTable({ promise: _ }: iAppProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div className="animate-pulse space-y-3 p-6">
        <div className="h-4 w-1/3 rounded bg-muted" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
