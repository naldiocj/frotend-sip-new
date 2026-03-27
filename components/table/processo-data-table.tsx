"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  convertData,
  convertEstadoProcessoToNormalCase,
  getBageEstadoProcesso,
  toUpperCase,
} from "@/lib/date-utils";
import { ProcessoListItem } from "@/lib/dto/processo.dto";

import { INSTRUTOR_PATHS } from "@/lib/path";
import { replaceAllChar } from "@/lib/utils";
import { EllipsisVertical, FolderOpenDot, Trash } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import BadgeTipoProcesso from "./badge-tipo-processo";
import { DraggableRow } from "./draggable-row";
import Paginator from "./paginator";

const columns: ColumnDef<ProcessoListItem>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "numero",
    accessorKey: "numero",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Número
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => row.original.numero,
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "tipoProcesso",
    accessorKey: "tipoProcesso",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipo
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => (
      <BadgeTipoProcesso tipoProcesso={row.original.tipoProcesso} />
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "estadoProcesso",
    accessorKey: "estadoProcesso",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => (
      <span className="flex items-center gap-2">
        <Badge
          variant={getBageEstadoProcesso(row.original.estadoProcesso) as any}
          className="p-2"
        >
          {toUpperCase(
            convertEstadoProcessoToNormalCase(row.original.estadoProcesso),
          )}
        </Badge>
      </span>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "descricao",
    accessorKey: "descricao",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Descrição
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => row.original.descricao,
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Registo
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => convertData(row.original.createdAt),
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <span
        className="cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Acções
        {column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
        {column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
      </span>
    ),
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={`${INSTRUTOR_PATHS.PROCESSOS}/${replaceAllChar(row.original.numero, "/", "-")}`}
              >
                <FolderOpenDot />
                Abrir
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash />
              Remover
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
    enableSorting: true,
  },
];

interface iAppProps {
  promise: Promise<ProcessoListItem[]>;
}

export function ProcessoDataTable({ promise }: iAppProps) {
  const initialData = use(promise);
  const [data, setData] = React.useState(initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <Paginator table={table} />
    </>
  );
}

export function SkeletonProcessDataTable({ promise }: iAppProps) {
  const data = use(promise);

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-white">
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(data.length)].map((_, i) => (
            <div key={i} className="h-6 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
