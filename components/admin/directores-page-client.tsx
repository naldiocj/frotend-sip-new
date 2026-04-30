"use client";

import {
  bulkCreateDirector,
  createDirector,
  deleteDirector,
  updateDirector,
} from "@/app/services/director.service";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertData } from "@/lib/date-utils";
import { CargoDTO } from "@/lib/dto/cargo.dto";
import { DirectorDTO } from "@/lib/dto/director.dto";
import { PatenteDTO } from "@/lib/dto/patente.dto";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Eye,
  FileSpreadsheet,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ComboboxSelect } from "@/components/ui/combobox-standard";

interface PageProps {
  initialData: DirectorDTO[];
  patentes?: PatenteDTO[];
  cargos?: CargoDTO[];
  direccoes?: any[];
  usuarios?: any[];
}

function SelectCombobox({
  value,
  onChange,
  options,
  placeholder,
}: {
  value?: number;
  onChange: (val?: number | undefined) => void;
  options: { id: number; label: string }[];
  placeholder?: string;
}) {
  return (
    <ComboboxSelect
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className="w-full"
    />
  );
}

const CSV_TEMPLATE =
  "nomeCompleto,patenteId,cargoId,direcaoId,userId\nJoão Manuel dos Santos,1,1,1,1\nMaria Fernanda Kalaluena,2,2,2,2";

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "directores_template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function parseCSV(content: string): Partial<DirectorDTO>[] {
  const lines = content.trim().split("\n");
  const result: Partial<DirectorDTO>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length >= 1) {
      const item: Partial<DirectorDTO> = {
        nomeCompleto: parts[0].trim(),
      };
      if (parts[1]) item.patenteId = parseInt(parts[1].trim()) || undefined;
      if (parts[2]) item.cargoId = parseInt(parts[2].trim()) || undefined;
      if (parts[3]) item.direcaoId = parseInt(parts[3].trim()) || undefined;
      if (parts[4]) item.userId = parseInt(parts[4].trim()) || undefined;
      result.push(item);
    }
  }

  return result;
}

export function DirectoresPageClient({
  initialData,
  patentes = [],
  cargos = [],
  direccoes = [],
  usuarios = [],
}: PageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [viewModal, setViewModal] = useState<DirectorDTO | null>(null);
  const [editModal, setEditModal] = useState<DirectorDTO | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DirectorDTO | null>(null);
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkPreview, setBulkPreview] = useState<Partial<DirectorDTO>[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editForm, setEditForm] = useState({
    nomeCompleto: "",
    patenteId: undefined as number | undefined,
    cargoId: undefined as number | undefined,
    direcaoId: undefined as number | undefined,
    userId: undefined as number | undefined,
  });
  const [createForm, setCreateForm] = useState({
    nomeCompleto: "",
    patenteId: undefined as number | undefined,
    cargoId: undefined as number | undefined,
    direcaoId: undefined as number | undefined,
    userId: undefined as number | undefined,
  });

  const patentesOptions = useMemo(
    () => patentes.map((p) => ({ id: p.id, label: p.nome })),
    [patentes],
  );
  const cargosOptions = useMemo(
    () => cargos.map((c) => ({ id: c.id, label: c.nome })),
    [cargos],
  );
  const direcoesOptions = useMemo(
    () => direccoes.map((d) => ({ id: d.id, label: d.nome })),
    [direccoes],
  );
  const usuariosOptions = useMemo(
    () => usuarios.map((u) => ({ id: u.id, label: u.name || u.email })),
    [usuarios],
  );

  const openViewModal = (director: DirectorDTO) => setViewModal(director);
  const openEditModal = (director: DirectorDTO) => {
    setEditModal(director);
    setEditForm({
      nomeCompleto: director.nomeCompleto,
      patenteId: director.patenteId,
      cargoId: director.cargoId,
      direcaoId: director.direcaoId,
      userId: director.userId,
    });
  };
  const openDeleteModal = (director: DirectorDTO) => setDeleteModal(director);

  const getPatenteNome = (id?: number) =>
    patentes.find((p) => p.id === id)?.nome || "—";
  const getCargoNome = (id?: number) =>
    cargos.find((c) => c.id === id)?.nome || "—";
  const getDirecaoNome = (id?: number) =>
    direccoes.find((d) => d.id === id)?.nome || "—";
  const getUsuarioNome = (id?: number) => {
    const u = usuarios.find((x) => x.id === id);
    return u?.name || u?.email || "—";
  };

  const handleCreate = async () => {
    if (!createForm.nomeCompleto.trim()) {
      toast.error("Nome completo é obrigatório.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createDirector({
        nomeCompleto: createForm.nomeCompleto,
        patenteId: createForm.patenteId,
        cargoId: createForm.cargoId,
        direcaoId: createForm.direcaoId,
        userId: createForm.userId,
      } as DirectorDTO);
      toast.success("Director criado com sucesso.");
      setCreateModal(false);
      setCreateForm({
        nomeCompleto: "",
        patenteId: undefined,
        cargoId: undefined,
        direcaoId: undefined,
        userId: undefined,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar director.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.nomeCompleto.trim() || !editModal) {
      toast.error("Nome completo é obrigatório.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDirector(String(editModal.id), {
        nomeCompleto: editForm.nomeCompleto,
        patenteId: editForm.patenteId,
        cargoId: editForm.cargoId,
        direcaoId: editForm.direcaoId,
      });
      toast.success("Director atualizado com sucesso.");
      setEditModal(null);
      setEditForm({
        nomeCompleto: "",
        patenteId: undefined,
        cargoId: undefined,
        direcaoId: undefined,
        userId: undefined,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar director.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setIsSubmitting(true);
    try {
      await deleteDirector(String(deleteModal.id));
      toast.success("Director eliminado com sucesso.");
      setDeleteModal(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao eliminar director.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = parseCSV(content);
      setBulkPreview(parsed);
    };
    reader.readAsText(file);
  };

  const handleBulkUpload = async () => {
    if (bulkPreview.length === 0) return;
    setIsSubmitting(true);
    try {
      await bulkCreateDirector(bulkPreview as DirectorDTO[]);
      toast.success(`${bulkPreview.length} directores importados com sucesso.`);
      setBulkModal(false);
      setBulkPreview([]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao importar directores.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = useMemo<ColumnDef<DirectorDTO>[]>(
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
        accessorKey: "nomeCompleto",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground"
            onClick={() => column.toggleSorting()}
          >
            <span className="font-medium">Nome Completo</span>
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="size-3.5 opacity-60" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="size-3.5 opacity-60" />
            )}
            {!column.getIsSorted() && (
              <ChevronsUpDown className="size-3.5 opacity-60" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("nomeCompleto")}</span>
        ),
      },
      {
        accessorKey: "patenteId",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Patente</span>
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="size-3.5 opacity-60" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="size-3.5 opacity-60" />
            )}
            {!column.getIsSorted() && (
              <ChevronsUpDown className="size-3.5 opacity-60" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("patenteId") as number | undefined;
          return (
            <span className="text-muted-foreground">
              {value ? getPatenteNome(value) : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "cargoId",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Cargo</span>
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="size-3.5 opacity-60" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="size-3.5 opacity-60" />
            )}
            {!column.getIsSorted() && (
              <ChevronsUpDown className="size-3.5 opacity-60" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("cargoId") as number | undefined;
          return (
            <span className="text-muted-foreground">
              {value ? getCargoNome(value) : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "direcaoId",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Direção</span>
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="size-3.5 opacity-60" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="size-3.5 opacity-60" />
            )}
            {!column.getIsSorted() && (
              <ChevronsUpDown className="size-3.5 opacity-60" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("direcaoId") as number | undefined;
          return (
            <span className="text-muted-foreground">
              {value ? getDirecaoNome(value) : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "userId",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Usuário</span>
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="size-3.5 opacity-60" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="size-3.5 opacity-60" />
            )}
            {!column.getIsSorted() && (
              <ChevronsUpDown className="size-3.5 opacity-60" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("userId") as number | undefined;
          return (
            <span className="text-muted-foreground">
              {value ? getUsuarioNome(value) : "—"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const director = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(director)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(director)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => openDeleteModal(director)}
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
    [patentes, cargos, direccoes, usuarios],
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
                Catálogo de Directores
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Directores cadastrados
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie os directores do SIP.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setBulkModal(true)}
              >
                <Upload className="h-4 w-4" />
                Importar CSV
              </Button>
              <Button className="gap-2" onClick={() => setCreateModal(true)}>
                <Plus className="h-4 w-4" />
                Novo Director
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
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

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de{" "}
                    {table.getPageCount()}
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Director</DialogTitle>
            </DialogHeader>
            {viewModal && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Nome Completo
                  </Label>
                  <div className="col-span-3 font-medium">
                    {viewModal.nomeCompleto}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Patente
                  </Label>
                  <div className="col-span-3">
                    {getPatenteNome(viewModal.patenteId)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Cargo
                  </Label>
                  <div className="col-span-3">
                    {getCargoNome(viewModal.cargoId)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Direcção
                  </Label>
                  <div className="col-span-3">
                    {getDirecaoNome(viewModal.direcaoId)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Usuário
                  </Label>
                  <div className="col-span-3">
                    {getUsuarioNome(viewModal.userId)}
                  </div>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Director</DialogTitle>
            </DialogHeader>
            {editModal && (
              <form className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome Completo *</Label>
                  <Input
                    id="edit-nome"
                    value={editForm.nomeCompleto}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nomeCompleto: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patente</Label>
                    <SelectCombobox
                      value={editForm.patenteId}
                      onChange={(val) => {
                        setEditForm({ ...editForm, patenteId: val });
                      }}
                      options={patentesOptions}
                      placeholder="Selecionar patente..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cargo</Label>
                    <SelectCombobox
                      value={editForm.cargoId}
                      onChange={(val) =>
                        setEditForm({ ...editForm, cargoId: val })
                      }
                      options={cargosOptions}
                      placeholder="Selecionar cargo..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Direcção</Label>
                    <SelectCombobox
                      value={editForm.direcaoId}
                      onChange={(val) =>
                        setEditForm({ ...editForm, direcaoId: val })
                      }
                      options={direcoesOptions}
                      placeholder="Selecionar direcção..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Usuário</Label>
                    <SelectCombobox
                      value={editForm.userId}
                      onChange={(val) =>
                        setEditForm({ ...editForm, userId: val })
                      }
                      options={usuariosOptions}
                      placeholder="Selecionar usuário..."
                    />
                  </div>
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Director</DialogTitle>
              <DialogDescription>
                Cadastre um novo director no sistema.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-nome">Nome Completo *</Label>
                <Input
                  id="create-nome"
                  value={createForm.nomeCompleto}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      nomeCompleto: e.target.value,
                    })
                  }
                  placeholder="ex: João Manuel dos Santos"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patente</Label>
                  <SelectCombobox
                    value={createForm.patenteId}
                    onChange={
                      (val) => { }
                      // setCreateForm({ ...createForm, patenteId: val })
                    }
                    options={patentesOptions}
                    placeholder="Selecionar patente..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <SelectCombobox
                    value={createForm.cargoId}
                    onChange={(val) =>
                      setCreateForm({ ...createForm, cargoId: val })
                    }
                    options={cargosOptions}
                    placeholder="Selecionar cargo..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Direcção</Label>
                  <SelectCombobox
                    value={createForm.direcaoId}
                    onChange={(val) =>
                      setCreateForm({ ...createForm, direcaoId: val })
                    }
                    options={direcoesOptions}
                    placeholder="Selecionar direcção..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Usuário</Label>
                  <SelectCombobox
                    value={createForm.userId}
                    onChange={(val) =>
                      setCreateForm({ ...createForm, userId: val })
                    }
                    options={usuariosOptions}
                    placeholder="Selecionar usuário..."
                  />
                </div>
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreate();
                  }}
                >
                  {isSubmitting ? "A criar..." : "Criar Director"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Director</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja eliminar o director "
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

        {/* Bulk Upload Modal */}
        <Dialog open={bulkModal} onOpenChange={setBulkModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importar Directores</DialogTitle>
              <DialogDescription>
                Carregue um arquivo CSV com os directores para importar em bulk.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={downloadTemplate}
                >
                  <Download className="h-4 w-4" />
                  Baixar Modelo
                </Button>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Clique ou arraste o arquivo CSV aqui
                </p>
                <p className="text-xs text-muted-foreground">
                  Formato: nomeCompleto,patenteId,cargoId,direcaoId,userId
                </p>
              </div>

              {bulkPreview.length > 0 && (
                <div className="space-y-2">
                  <Label>Preview ({bulkPreview.length} registos)</Label>
                  <div className="max-h-40 overflow-auto rounded border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome Completo</TableHead>
                          <TableHead>Patente</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Direção</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bulkPreview.slice(0, 5).map((item, i) => (
                          <TableRow key={i}>
                            <TableCell>{item.nomeCompleto}</TableCell>
                            <TableCell>
                              {item.patenteId
                                ? getPatenteNome(item.patenteId)
                                : "—"}
                            </TableCell>
                            <TableCell>
                              {item.cargoId ? getCargoNome(item.cargoId) : "—"}
                            </TableCell>
                            <TableCell>
                              {item.direcaoId
                                ? getDirecaoNome(item.direcaoId)
                                : "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {bulkPreview.length > 5 && (
                    <p className="text-xs text-muted-foreground">
                      ...e mais {bulkPreview.length - 5} registos
                    </p>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setBulkModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleBulkUpload}
                disabled={bulkPreview.length === 0 || isSubmitting}
              >
                {isSubmitting
                  ? "A importar..."
                  : `Importar ${bulkPreview.length} registos`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
