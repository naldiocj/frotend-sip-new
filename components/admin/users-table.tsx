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
import { Search, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, X, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserDTO, RoleDTO } from "@/lib/dto/user.dto";

interface UsersTableProps {
  data: UserDTO[];
  roles: RoleDTO[];
}

export function UsersTable({ data: initialData, roles }: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [viewModal, setViewModal] = useState<UserDTO | null>(null);
  const [editModal, setEditModal] = useState<UserDTO | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    active: true,
    roleIds: [] as number[],
  });

  const openViewModal = (user: UserDTO) => {
    setViewModal(user);
  };

  const openEditModal = (user: UserDTO) => {
    setEditModal(user);
    setEditForm({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      active: user.active ?? true,
      roleIds: user.roles?.map((r) => r.id) || [],
    });
  };

  const toggleEditRole = (roleId: number) => {
    setEditForm((prev) => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
  };

  const columns = useMemo<ColumnDef<UserDTO>[]>(
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
        accessorKey: "name",
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
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Email</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("email")}</span>,
      },
      {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Telefone</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("phoneNumber") as string | undefined;
          return <span className="text-muted-foreground">{value || "—"}</span>;
        },
      },
      {
        accessorKey: "roles",
        header: "Perfis",
        cell: ({ row }) => {
          const roles = row.getValue("roles") as { id: number; name: string }[];
          return (
            <div className="flex flex-wrap gap-1">
              {roles?.length > 0 ? (
                roles.map((role) => (
                  <Badge key={role.id} variant="outline" className="text-[10px]">
                    {role.name}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "active",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-normal text-secondary-foreground/80 hover:bg-secondary"
            onClick={() => column.toggleSorting()}
          >
            <span className="text-muted-foreground">Estado</span>
            {column.getIsSorted() === "asc" && <ArrowUp className="size-3.5 opacity-60" />}
            {column.getIsSorted() === "desc" && <ArrowDown className="size-3.5 opacity-60" />}
            {!column.getIsSorted() && <ChevronsUpDown className="size-3.5 opacity-60" />}
          </Button>
        ),
        cell: ({ row }) => {
          const active = row.getValue("active") as boolean;
          return (
            <Badge variant={active ? "default" : "secondary"}>
              {active ? "Ativo" : "Inativo"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewModal(user)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal(user)}>
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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, email ou telefone..."
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
                      : flexRender(header.column.columnDef.header, header.getContext())}
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

      {/* View Modal */}
      <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Utilizador</DialogTitle>
            <DialogDescription>
              Informação completa do utilizador registado no sistema.
            </DialogDescription>
          </DialogHeader>
          {viewModal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Nome</Label>
                <div className="col-span-3 font-medium">{viewModal.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Email</Label>
                <div className="col-span-3">{viewModal.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Telefone</Label>
                <div className="col-span-3">{viewModal.phoneNumber || "—"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Estado</Label>
                <div className="col-span-3">
                  <Badge variant={viewModal.active ? "default" : "secondary"}>
                    {viewModal.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Perfis</Label>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {viewModal.roles?.length > 0 ? (
                    viewModal.roles.map((role) => (
                      <Badge key={role.id} variant="outline">
                        {role.name}
                      </Badge>
                    ))
                  ) : (
                    <span>—</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-muted-foreground">Criado em</Label>
                <div className="col-span-3">
                  {viewModal.createdAt
                    ? new Date(viewModal.createdAt).toLocaleDateString("pt-BR")
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
            <DialogTitle>Editar Utilizador</DialogTitle>
            <DialogDescription>
              Atualize os dados do utilizador no sistema.
            </DialogDescription>
          </DialogHeader>
          {editModal && (
            <form className="grid gap-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    value={editForm.phoneNumber}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={editForm.active ? "true" : "false"}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, active: value === "true" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Ativo</SelectItem>
                      <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Perfis</Label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => toggleEditRole(role.id)}
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                        editForm.roleIds.includes(role.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {role.name}
                    </div>
                  ))}
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
                <Button type="submit">Guardar Alterações</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}