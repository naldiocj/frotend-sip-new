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
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Briefcase,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from "lucide-react";
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
import { SecretariaDTO } from "@/lib/dto/secretaria.dto";
import { convertData } from "@/lib/date-utils";
import {
  createSecretaria,
  updateSecretaria,
  deleteSecretaria,
} from "@/app/services/secretaria.service";

interface PageProps {
  initialData: SecretariaDTO[];
}

export function SecretariasPageClient({ initialData }: PageProps) {
  const [sorting, setSorting] = useState<SortingState>([] as SortingState);
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewModal, setViewModal] = useState<SecretariaDTO | null>(null);
  const [editModal, setEditModal] = useState<SecretariaDTO | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<SecretariaDTO | null>(null);
  const [editForm, setEditForm] = useState({
    nomeCompleto: "",
    codigo: "",
    descricao: "",
  });
  const [createForm, setCreateForm] = useState({
    nomeCompleto: "",
    codigo: "",
    descricao: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const openViewModal = (secretaria: SecretariaDTO) => setViewModal(secretaria);
  const openEditModal = (secretaria: SecretariaDTO) => {
    setEditModal(secretaria);
    setEditForm({
      nomeCompleto: secretaria.nomeCompleto,
      codigo: secretaria.codigo,
      descricao: secretaria.descricao || "",
    });
  };
  const openDeleteModal = (secretaria: SecretariaDTO) =>
    setDeleteModal(secretaria);

  const handleCreate = async () => {
    if (!createForm.nomeCompleto.trim() || !createForm.codigo.trim()) {
      toast.error("Nome e Código são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createSecretaria(createForm);
      toast.success("Secretaria criada com sucesso.");
      setCreateModal(false);
      setCreateForm({ nomeCompleto: "", codigo: "", descricao: "" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar secretaria.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (
      !editForm.nomeCompleto.trim() ||
      !editForm.codigo.trim() ||
      !editModal
    ) {
      toast.error("Nome e Código são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateSecretaria(String(editModal.id), editForm);
      toast.success("Secretaria atualizada com sucesso.");
      setEditModal(null);
      setEditForm({ nomeCompleto: "", codigo: "", descricao: "" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar secretaria.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setIsSubmitting(true);
    try {
      await deleteSecretaria(String(deleteModal.id));
      toast.success("Secretaria eliminada com sucesso.");
      setDeleteModal(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao eliminar secretaria.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = useMemo<ColumnDef<SecretariaDTO>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">ID</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">#{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "nomeCompleto",
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
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("nomeCompleto")}</span>
        ),
      },
      {
        accessorKey: "codigo",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Código</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("codigo")}
          </span>
        ),
      },
      {
        accessorKey: "direcao",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Direção</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => {
          const direcao = row.getValue("direcao") as { nome: string; sigla: string } | undefined;
          return (
            <span className="text-muted-foreground">
              {direcao ? `${direcao.sigla} - ${direcao.nome}` : "—"}
            </span>
          );
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
          return (
            <span className="text-muted-foreground">
              {value ? convertData(value) : "—"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const secretaria = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(secretaria)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(secretaria)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => openDeleteModal(secretaria)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
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
                Catálogo de Secretarias
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Secretarias cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie as secretarias do SIP.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="gap-2" onClick={() => setCreateModal(true)}>
                <Plus className="h-4 w-4" />
                Nova Secretaria
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-5 w-5" />
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
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
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
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
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
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Página {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
                </span>
                <div className="flex items-center gap-2">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* View Modal */}
        <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Detalhes da Secretaria</DialogTitle>
            </DialogHeader>
            {viewModal && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Nome
                  </Label>
                  <div className="col-span-3 font-medium">
                    {viewModal.nomeCompleto}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Código
                  </Label>
                  <div className="col-span-3">{viewModal.codigo}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Descrição
                  </Label>
                  <div className="col-span-3">{viewModal.descricao || "—"}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Criado em
                  </Label>
                  <div className="col-span-3">
                    {viewModal.createdAt
                      ? convertData(viewModal.createdAt)
                      : "—"}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Atualizado em
                  </Label>
                  <div className="col-span-3">
                    {viewModal.updatedAt
                      ? convertData(viewModal.updatedAt)
                      : "—"}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewModal(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
          <DialogContent size="full">
            <DialogHeader>
              <DialogTitle>Editar Secretaria</DialogTitle>
            </DialogHeader>
            {editModal && (
              <form className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome *</Label>
                  <Input
                    id="edit-nome"
                    value={editForm.nomeCompleto}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nomeCompleto: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-codigo">Código *</Label>
                  <Input
                    id="edit-codigo"
                    value={editForm.codigo}
                    onChange={(e) =>
                      setEditForm({ ...editForm, codigo: e.target.value })
                    }
                    placeholder="SG"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-descricao">Descrição</Label>
                  <Input
                    id="edit-descricao"
                    value={editForm.descricao}
                    onChange={(e) =>
                      setEditForm({ ...editForm, descricao: e.target.value })
                    }
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditModal(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleUpdate}
                  >
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
              <DialogTitle>Nova Secretaria</DialogTitle>
              <DialogDescription>
                Cadastre uma nova secretaria no sistema.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-nome">Nome *</Label>
                <Input
                  id="create-nome"
                  value={createForm.nomeCompleto}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      nomeCompleto: e.target.value,
                    })
                  }
                  placeholder="Secretaria Geral"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-codigo">Código *</Label>
                <Input
                  id="create-codigo"
                  value={createForm.codigo}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, codigo: e.target.value })
                  }
                  placeholder="SG"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-descricao">Descrição</Label>
                <Input
                  id="create-descricao"
                  value={createForm.descricao}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, descricao: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleCreate}
                >
                  {isSubmitting ? "A criar..." : "Criar Secretaria"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle>Eliminar Secretaria</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja eliminar a secretaria "
                {deleteModal?.nomeCompleto}"? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteModal(null)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "A eliminar..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
