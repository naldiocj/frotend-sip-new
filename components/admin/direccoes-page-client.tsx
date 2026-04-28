"use client";

import {
  bulkCreateDirecao,
  CreateDirecaoDTO,
  DirecaoDTO,
} from "@/app/services/direcao.service";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileSpreadsheet,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface PageProps {
  initialData: DirecaoDTO[];
}

const CSV_TEMPLATE =
  "nome,sigla,descricao\nDireção de Investigação Criminal,DIC,Responsável pela investigação criminal\nDireção de Polícia Judiciária,DPJ,Responsável pela polícia judiciária";

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "direcoes_template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function parseCSV(content: string): CreateDirecaoDTO[] {
  const lines = content.trim().split("\n");
  const result: CreateDirecaoDTO[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length >= 3) {
      result.push({
        nome: parts[0].trim(),
        sigla: parts[1].trim(),
        descricao: parts.slice(2).join(",").trim(),
      });
    }
  }

  return result;
}

export function DireccoesPageClient({ initialData }: PageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<DirecaoDTO[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewModal, setViewModal] = useState<DirecaoDTO | null>(null);
  const [editModal, setEditModal] = useState<DirecaoDTO | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkPreview, setBulkPreview] = useState<CreateDirecaoDTO[]>([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: "",
    sigla: "",
    descricao: "",
  });
  const [createForm, setCreateForm] = useState({
    nome: "",
    sigla: "",
    descricao: "",
  });

  const openViewModal = (direcao: DirecaoDTO) => setViewModal(direcao);
  const openEditModal = (direcao: DirecaoDTO) => {
    setEditModal(direcao);
    setEditForm({
      nome: direcao.nome,
      sigla: direcao.sigla || "",
      descricao: direcao.descricao || "",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = parseCSV(content);
      setBulkPreview(parsed);
      setBulkFile(file);
    };
    reader.readAsText(file);
  };

  const handleBulkUpload = async () => {
    if (bulkPreview.length === 0) return;

    setIsBulkLoading(true);

    try {
      await bulkCreateDirecao(bulkPreview);
      toast.success(`${bulkPreview.length} direções importadas com sucesso.`);
      setBulkModal(false);
      setBulkFile(null);
      setBulkPreview([]);
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao importar direções.",
      );
    } finally {
      setIsBulkLoading(false);
    }
  };

  const columns = useMemo<ColumnDef<DirecaoDTO>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <span className="text-muted-foreground">#{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "nome",
        header: "Nome",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("nome")}</span>
        ),
      },
      {
        accessorKey: "sigla",
        header: "Sigla",
        cell: ({ row }) => {
          const value = row.getValue("sigla") as string | undefined;
          return <span className="text-muted-foreground">{value || "—"}</span>;
        },
      },
      {
        accessorKey: "descricao",
        header: "Descrição",
        cell: ({ row }) => {
          const value = row.getValue("descricao") as string | undefined;
          return <span className="text-muted-foreground">{value || "—"}</span>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Atualizado em",
        cell: ({ row }) => {
          const value = row.getValue("updatedAt") as string;
          return (
            <span className="text-muted-foreground">
              {value ? new Date(value).toLocaleDateString("pt-BR") : "—"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const direcao = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(direcao)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(direcao)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
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
                Catálogo de Direções
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Direções cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Visualize e administre as direções utilizadas no SIP.
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
                Nova Direção
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Total
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {initialData.length}
                  </p>
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
              <DialogTitle>Detalhes da Direção</DialogTitle>
              <DialogDescription>
                Informação completa da direção registada.
              </DialogDescription>
            </DialogHeader>
            {viewModal && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Nome
                  </Label>
                  <div className="col-span-3 font-medium">{viewModal.nome}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Sigla
                  </Label>
                  <div className="col-span-3">{viewModal.sigla || "—"}</div>
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
                      ? new Date(viewModal.createdAt).toLocaleDateString(
                        "pt-BR",
                      )
                      : "—"}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-muted-foreground">
                    Atualizado em
                  </Label>
                  <div className="col-span-3">
                    {viewModal.updatedAt
                      ? new Date(viewModal.updatedAt).toLocaleDateString(
                        "pt-BR",
                      )
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
              <DialogTitle>Editar Direção</DialogTitle>
              <DialogDescription>
                Atualize os dados da direção.
              </DialogDescription>
            </DialogHeader>
            {editModal && (
              <form className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome *</Label>
                  <Input
                    id="edit-nome"
                    value={editForm.nome}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nome: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sigla">Sigla</Label>
                  <Input
                    id="edit-sigla"
                    value={editForm.sigla}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sigla: e.target.value })
                    }
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
                  <Button type="submit">Guardar Alterações</Button>
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
              <DialogDescription>
                Cadastre uma nova direção no sistema.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-nome">Nome *</Label>
                <Input
                  id="create-nome"
                  value={createForm.nome}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, nome: e.target.value })
                  }
                  placeholder="ex: Direção de Investigação Criminal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-sigla">Sigla</Label>
                <Input
                  id="create-sigla"
                  value={createForm.sigla}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, sigla: e.target.value })
                  }
                  placeholder="ex: DIC"
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
                  placeholder="ex: Responsável pela investigação criminal"
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
                <Button type="submit">Criar Direção</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Bulk Upload Modal */}
        <Dialog open={bulkModal} onOpenChange={setBulkModal}>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Importar Direções</DialogTitle>
              <DialogDescription>
                Carregue um arquivo CSV com as direções para importar em bulk.
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
                  Formato: nome,sigla,descricao
                </p>
              </div>

              {bulkPreview.length > 0 && (
                <div className="space-y-2">
                  <Label>Preview ({bulkPreview.length} registos)</Label>
                  <div className="max-h-40 overflow-auto rounded border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Sigla</TableHead>
                          <TableHead>Descrição</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bulkPreview.slice(0, 5).map((item, i) => (
                          <TableRow key={i}>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.sigla}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
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
                disabled={bulkPreview.length === 0 || isBulkLoading}
              >
                {isBulkLoading
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
