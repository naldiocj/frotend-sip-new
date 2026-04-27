"use client";

import { AddDespachosModal } from "@/app/(admin)/instrutor/despachos/_modals/add-despachos-modal";
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
import { convertData } from "@/lib/date-utils";
import { Despacho } from "@/lib/dto/despacho.dto";
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
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState<"all" | "pendente" | "finalizado">("all");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "dataDespacho", desc: true },
  ]);

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((item) => {
      const textMatch =
        term.length === 0 ||
        item.numeroProcesso.toLowerCase().includes(term) ||
        item.decisao.toLowerCase().includes(term) ||
        item.autoridadeResponsavel.toLowerCase().includes(term);

      const estadoMatch =
        estado === "all"
          ? true
          : estado === "finalizado"
            ? item.isFinalizado
            : !item.isFinalizado;

      return textMatch && estadoMatch;
    });
  }, [data, search, estado]);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? `${row.numeroProcesso}-${row.dataDespacho}`),
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
            placeholder="Pesquisar por processo, decisão ou autoridade..."
          />
          <Select value={estado} onValueChange={(v) => setEstado(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="finalizado">Finalizados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setOpenModal(true)} className="shrink-0">
          <CirclePlus className="h-4 w-4" />
          Registar despacho
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

      <AddDespachosModal open={openModal} setOpen={setOpenModal} />
    </>
  );
}

