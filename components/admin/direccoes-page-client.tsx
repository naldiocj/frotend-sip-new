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
import { Search, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Plus, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { convertData } from "@/lib/date-utils";
import { createDireccao, updateDireccao, deleteDireccao } from "@/app/services/direccao.service";

interface PageProps {
  initialData: DireccaoDTO[];
}

export function DireccoesPageClient({ initialData }: PageProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewModal, setViewModal] = useState<DireccaoDTO | null>(null);
  const [editModal, setEditModal] = useState<DireccaoDTO | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DireccaoDTO | null>(null);
  const [editForm, setEditForm] = useState({ nome: "", sigla: "", descricao: "" });
  const [createForm, setCreateForm] = useState({ nome: "", sigla: "", descricao: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openViewModal = (direccao: DireccaoDTO) => setViewModal(direccao);
  const openEditModal = (direccao: DireccaoDTO) => {
    setEditModal(direccao);
    setEditForm({ nome: direccao.nome, sigla: direccao.sigla, descricao: direccao.descricao || "" });
  };
  const openDeleteModal = (direccao: DireccaoDTO) => setDeleteModal(direccao);

  const handleCreate = async () => {
    if (!createForm.nome.trim() || !createForm.sigla.trim()) {
      toast.error("Nome e Sigla são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createDireccao(createForm);
      toast.success("Direção criada com sucesso.");
      setCreateModal(false);
      setCreateForm({ nome: "", sigla: "", descricao: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar direção.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.nome.trim() || !editForm.sigla.trim() || !editModal) {
      toast.error("Nome e Sigla são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDireccao(String(editModal.id), editForm);
      toast.success("Direção atualizada com sucesso.");
      setEditModal(null);
      setEditForm({ nome: "", sigla: "", descricao: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar direção.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setIsSubmitting(true);
    try {
      await deleteDireccao(String(deleteModal.id));
      toast.success("Direção eliminada com sucesso.");
      setDeleteModal(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao eliminar direção.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = useMemo<ColumnDef<DireccaoDTO>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <span className="text-muted-foreground">#{row.getValue("id")}</span>,
      },
      {
        accessorKey: "nome",
        header: "Nome",
        cell: ({ row }) => <span className="font-medium">{row.getValue("nome")}</span>,
      },
      {
        accessorKey: "sigla",
        header: "Sigla",
        cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("sigla")}</span>,
      },
      {
        accessorKey: "updatedAt",
        header: "Atualizado em",
        cell: ({ row }) => {
          const value = row.getValue("updatedAt") as string;
          return <span className="text-muted-foreground">{value ? convertData(value) : "—"}</span>;
        },
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const direccao = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(direccao)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(direccao)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => openDeleteModal(direccao)}>
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
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Gestão de Direções
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Direções cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie as direções do SIP.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="gap-2" onClick={() => setCreateModal(true)}>
                <Plus className="h-4 w-4" />
                Nova Direção
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
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

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRight className="h-4 w-4" />
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
              <DialogTitle>Detalhes da Direção</DialogTitle>
            </DialogHeader>
            {viewModal && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Nome</Label>
                  <div className="col-span-3 font-medium">{viewModal.nome}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Sigla</Label>
                  <div className="col-span-3">{viewModal.sigla}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">Descrição</Label>
                  <div className="col-span-3">{viewModal.descricao || "—"}</div>
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
              <DialogTitle>Editar Direção</DialogTitle>
            </DialogHeader>
            {editModal && (
              <form className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome *</Label>
                  <Input id="edit-nome" value={editForm.nome} onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sigla">Sigla *</Label>
                  <Input id="edit-sigla" value={editForm.sigla} onChange={(e) => setEditForm({ ...editForm, sigla: e.target.value })} placeholder="DPLU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-descricao">Descrição</Label>
                  <Input id="edit-descricao" value={editForm.descricao} onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })} />
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
              <DialogTitle>Nova Direção</DialogTitle>
              <DialogDescription>Cadastre uma nova direção no sistema.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-nome">Nome *</Label>
                <Input id="create-nome" value={createForm.nome} onChange={(e) => setCreateForm({ ...createForm, nome: e.target.value })} placeholder="Direção Provincial de Luanda" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-sigla">Sigla *</Label>
                <Input id="create-sigla" value={createForm.sigla} onChange={(e) => setCreateForm({ ...createForm, sigla: e.target.value })} placeholder="DPLU" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-descricao">Descrição</Label>
                <Input id="create-descricao" value={createForm.descricao} onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateModal(false)}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting} onClick={handleCreate}>
                  {isSubmitting ? "A criar..." : "Criar Direção"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle>Eliminar Direção</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja eliminar a direção "{deleteModal?.nome}"? Esta ação não pode ser desfeita.
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