"use client";

import { AddQueixosoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-queixoso-modal";
import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
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
import { QueixosoListItem } from "@/lib/dto/queixoso.dto";
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

const columns: ColumnDef<QueixosoListItem>[] = [
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
      <span className="font-mono text-xs text-foreground">{row.original.numeroBi}</span>
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
      <span className="text-sm text-foreground">{row.original.profissao || "—"}</span>
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
      <span className="font-mono text-xs text-foreground">{row.original.telefone}</span>
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
  promise: Promise<QueixosoListItem[]>;
}

export function QueixosoDataTable({ promise }: Props) {
  const data = use(promise);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("all");
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
        item.numeroBi.toLowerCase().includes(term) ||
        item.telefone.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const estadoMatch =
        estadoCivil === "all" ? true : item.estadoCivil === estadoCivil;

      return textMatch && estadoMatch;
    });
  }, [data, search, estadoCivil]);

  const estados = useMemo(
    () => Array.from(new Set(data.map((item) => item.estadoCivil))),
    [data],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id ?? row.numeroBi),
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
            placeholder="Pesquisar por nome, BI, telefone ou email..."
          />
          <Select value={estadoCivil} onValueChange={setEstadoCivil}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado civil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados civis</SelectItem>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setOpenModal(true)} className="shrink-0">
          <CirclePlus className="h-4 w-4" />
          Registar queixoso
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

      <AddQueixosoModal open={openModal} setOpen={setOpenModal} />
    </>
  );
}
