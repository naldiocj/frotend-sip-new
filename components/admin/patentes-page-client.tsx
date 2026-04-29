"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Plus, Award, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PatenteDTO } from "@/lib/dto/patente.dto";
import { convertData } from "@/lib/date-utils";
import { createPatente, updatePatente, deletePatente } from "@/app/services/patente.service";

interface PageProps {
  initialData: PatenteDTO[];
}

export function PatentesPageClient({ initialData }: PageProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [viewModal, setViewModal] = useState<PatenteDTO | null>(null);
  const [editModal, setEditModal] = useState<PatenteDTO | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<PatenteDTO | null>(null);
  const [editForm, setEditForm] = useState({ nome: "" });
  const [createForm, setCreateForm] = useState({ nome: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openViewModal = (patente: PatenteDTO) => setViewModal(patente);
  const openEditModal = (patente: PatenteDTO) => {
    setEditModal(patente);
    setEditForm({ nome: patente.nome });
  };
  const openDeleteModal = (patente: PatenteDTO) => setDeleteModal(patente);

  const handleCreate = async () => {
    if (!createForm.nome.trim()) {
      toast.error("Nome é obrigatório.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createPatente(createForm);
      toast.success("Patente criada com sucesso.");
      setCreateModal(false);
      setCreateForm({ nome: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar patente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.nome.trim() || !editModal) {
      toast.error("Nome é obrigatório.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updatePatente(String(editModal.id), editForm);
      toast.success("Patente atualizada com sucesso.");
      setEditModal(null);
      setEditForm({ nome: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar patente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setIsSubmitting(true);
    try {
      await deletePatente(String(deleteModal.id));
      toast.success("Patente eliminada com sucesso.");
      setDeleteModal(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao eliminar patente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = useMemo<ColumnDef<PatenteDTO>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar todas as linhas"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "nome",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="font-medium">Nome</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.getValue("nome")}</span>,
      },
      {
        accessorKey: "categoria",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Categoria</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("categoria") as { nome: string } | undefined;
          return <span className="text-muted-foreground">{value?.nome || "—"}</span>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Atualizado em</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("updatedAt") as string;
          return <span className="text-muted-foreground">{value ? convertData(value) : "—"}</span>;
        },
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const patente = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(patente)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(patente)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => openDeleteModal(patente)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: initialData,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Catálogo de Patentes
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Patentes cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie as patentes do SIP.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="gap-2" onClick={() => setCreateModal(true)}>
                <Plus className="h-4 w-4" />
                Nova Patente
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Total
                  </p>
                  <p className="text-lg font-semibold text-foreground">{initialData.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="p-6 lg:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por nome..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {table.getFilteredRowModel().rows.length} registos
                </span>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          Nenhum resultado encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                  </span>
                  {table.getSelectedRowModel().rows.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {table.getSelectedRowModel().rows.length} selecionado(s)
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Itens por página:</span>
                    <Select
                      value={String(table.getState().pagination.pageSize)}
                      onValueChange={(value) => table.setPageSize(Number(value))}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <ChevronLeft className="h-4 w-4 -ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4 -ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* View Modal */}
        <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Detalhes da Patente</DialogTitle>
            </DialogHeader>
            {viewModal && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Nome</Label>
                  <div className="col-span-3 font-medium">{viewModal.nome}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Categoria</Label>
                  <div className="col-span-3">{viewModal.categoria?.nome || "—"}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Criado em</Label>
                  <div className="col-span-3">{viewModal.createdAt ? convertData(viewModal.createdAt) : "—"}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Atualizado em</Label>
                  <div className="col-span-3">{viewModal.updatedAt ? convertData(viewModal.updatedAt) : "—"}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewModal(null)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
          <DialogContent size="full">
            <DialogHeader>
              <DialogTitle>Editar Patente</DialogTitle>
            </DialogHeader>
            {editModal && (
              <form className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome *</Label>
                  <Input id="edit-nome" value={editForm.nome} onChange={(e) => setEditForm({ nome: e.target.value })} />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditModal(null)}>Cancelar</Button>
                  <Button type="submit" disabled={isSubmitting} onClick={handleUpdate}>
                    {isSubmitting ? "A guardar..." : "Guardar Alterações"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Modal */}
        <Dialog open={createModal} onOpenChange={setCreateModal}>
          <DialogContent size="full">
            <DialogHeader>
              <DialogTitle>Nova Patente</DialogTitle>
              <DialogDescription>Cadastre uma nova patente no sistema.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-nome">Nome *</Label>
                <Input id="create-nome" value={createForm.nome} onChange={(e) => setCreateForm({ nome: e.target.value })} placeholder="ex: Comissário, Inspector" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateModal(false)}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting} onClick={handleCreate}>
                  {isSubmitting ? "A criar..." : "Criar Patente"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle>Eliminar Patente</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja eliminar a patente "{deleteModal?.nome}"? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteModal(null)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? "A eliminar..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}