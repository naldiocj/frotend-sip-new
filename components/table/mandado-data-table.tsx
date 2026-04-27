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
import { Mandado } from "@/lib/dto/mandado.dto";
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

const columns: ColumnDef<Mandado>[] = [
  {
    id: "tipo",
    accessorKey: "tipo",
    header: ({ column }) => (
      <DataGridColumnHeader title="Tipo" column={column} />
    ),
    cell: ({ row }) => {
      const labels: Record<string, string> = {
        MANDADO_DE_DETENCAO: "Detenção",
        MANDADO_DE_CUSTODIA: "Custódia",
        MANDADO_DE_BUSCA_E_APREENSAO: "Busca e Apreensão",
        MANDADO_DE_SOLTURA: "Soltura",
        MANDADO_DE_CAPTURA: "Captura",
      };
      return (
        <Badge variant="outline" className="px-2 py-1 text-[10px]">
          {labels[row.original.tipo] || row.original.tipo}
        </Badge>
      );
    },
    size: 160,
    enableSorting: true,
    enableHiding: false,
  },
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
    size: 150,
    enableSorting: true,
  },
  {
    id: "nomeRequerente",
    accessorKey: "nomeRequerente",
    header: ({ column }) => (
      <DataGridColumnHeader title="Requerente" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.nomeRequerente}</span>
    ),
    size: 160,
    enableSorting: true,
  },
  {
    id: "nomeExecutado",
    accessorKey: "nomeExecutado",
    header: ({ column }) => (
      <DataGridColumnHeader title="Executado" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.nomeExecutado}</span>
    ),
    size: 180,
    enableSorting: true,
  },
  {
    id: "dataEmitido",
    accessorKey: "dataEmitido",
    header: ({ column }) => (
      <DataGridColumnHeader title="Data Emissão" column={column} />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-foreground">
        {convertData(row.original.dataEmitido as any)}
      </span>
    ),
    size: 140,
    enableSorting: true,
  },
  {
    id: "estado",
    accessorKey: "estado",
    header: ({ column }) => (
      <DataGridColumnHeader title="Estado" column={column} />
    ),
    cell: ({ row }) => {
      const variants: Record<string, "secondary" | "outline" | "destructive"> = {
        PENDENTE: "outline",
        EM_EXECUCAO: "secondary",
        CUMPRIDO: "secondary",
        CANCELADO: "destructive",
      };
      const labels: Record<string, string> = {
        PENDENTE: "Pendente",
        EM_EXECUCAO: "Em Execução",
        CUMPRIDO: "Cumprido",
        CANCELADO: "Cancelado",
      };
      return (
        <Badge
          variant={variants[row.original.estado] || "outline"}
          className="px-2 py-1 text-[10px]"
        >
          {labels[row.original.estado] || row.original.estado}
        </Badge>
      );
    },
    size: 120,
    enableSorting: true,
    enableHiding: false,
  },
];

interface Props {
  promise: Promise<Mandado[]>;
}

export function MandadoDataTable({ promise }: Props) {
  const data = use(promise);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "dataEmitido", desc: true },
  ]);

  const table = useReactTable({
    columns,
    data,
    pageCount: Math.ceil((data.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id),
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