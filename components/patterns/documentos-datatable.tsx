"use client";

import { Badge } from "@/components/reui/badge";
import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
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
import { PARTICIPANTES } from "@/lib/constants";
import { ParticipanteData } from "@/lib/dto/participante.dto";

interface iAppProps {
  data: ParticipanteData[];
}

export function DocumentosDataTable({ data }: iAppProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "nome", desc: true },
  ]);

  const columns = useMemo<ColumnDef<ParticipanteData>[]>(
    () => [
      {
        accessorKey: "nome",
        id: "nome",
        header: ({ column }) => (
          <DataGridColumnHeader title="Nome completo" column={column} />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <div className="text-foreground font-medium">
                {row.original.tipoParticipante === PARTICIPANTES.ARGUIDO &&
                  row.original.arguido?.nomeCompleto}
                {row.original.tipoParticipante === PARTICIPANTES.QUEIXOSO &&
                  row.original.queixoso?.nomeCompleto}
                {row.original.tipoParticipante === PARTICIPANTES.TESTEMUNHA &&
                  row.original.testemunha?.nomeCompleto}
                {row.original.tipoParticipante === PARTICIPANTES.ADVOGADO &&
                  row.original.advogado?.nomeCompleto}
              </div>
            </div>
          );
        },
        size: 200,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "tipoParticipante",
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Tipo de Participante" column={column} />
        ),
        cell: ({ row }) => {
          const tipoParticipante = row.original.tipoParticipante;

          switch (tipoParticipante) {
            case PARTICIPANTES.QUEIXOSO:
              return (
                <Badge variant="success-outline">
                  {PARTICIPANTES.QUEIXOSO}
                </Badge>
              );
            case PARTICIPANTES.ARGUIDO:
              return (
                <Badge variant="warning-outline">{PARTICIPANTES.ARGUIDO}</Badge>
              );
            case PARTICIPANTES.TESTEMUNHA:
              return (
                <Badge variant="info-outline">{PARTICIPANTES.TESTEMUNHA}</Badge>
              );
            case PARTICIPANTES.ADVOGADO:
              return (
                <Badge variant="primary-outline">
                  {PARTICIPANTES.ADVOGADO}
                </Badge>
              );
            default:
              return <Badge variant="default">DESCONHECIDO</Badge>;
          }
        },
        size: 125,
        enableResizing: false,
      },
      {
        accessorKey: "telefone",
        id: "telefone",
        header: ({ column }) => (
          <DataGridColumnHeader title="Telefone" column={column} />
        ),
        cell: ({ row }) => {
          return (
            <div className="space-y-0.5 py-2">
              <div className="text-foreground font-medium">
                {row.original.tipoParticipante === PARTICIPANTES.ARGUIDO &&
                  row.original.arguido?.telefone}
                {row.original.tipoParticipante === PARTICIPANTES.QUEIXOSO &&
                  row.original.queixoso?.telefone}
                {row.original.tipoParticipante === PARTICIPANTES.TESTEMUNHA &&
                  row.original.testemunha?.telefone}
                {row.original.tipoParticipante === PARTICIPANTES.ADVOGADO &&
                  row.original.advogado?.telefone}
              </div>
            </div>
          );
        },
        size: 150,
        enableSorting: true,
        enableHiding: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: data,
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: ParticipanteData) => row.id,
    state: {
      pagination,
      sorting,
    },
    columnResizeMode: "onChange",
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
      tableLayout={{ columnsResizable: true }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer>
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
