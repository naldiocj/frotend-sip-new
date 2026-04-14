"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user-context";
import {
  BarChart3,
  Book,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  FileCheck,
  Folder,
  FolderOpen,
  History,
  LayoutDashboard,
  List,
  Settings2,
  Users,
} from "lucide-react";

/* ─── Navigation data ────────────────────────────────────────────────────── */

const data = {
  navAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Usuários",
      url: "/admin/usuarios",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Crimes",
      url: "/admin/tipos-de-crimes",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Categorias",
      url: "/admin/categorias",
      icon: <Folder className="h-4 w-4" />,
    },
    {
      title: "Patentes",
      url: "/admin/patentes",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      url: "/admin/direccoes",
      icon: <Folder className="h-4 w-4" />,
    },
    {
      title: "Auditoria",
      url: "/admin/auditoria",
      icon: <History className="h-4 w-4" />,
    },
  ],
  navDirector: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      url: "/director/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Instrutores",
      url: "/director/instrutores",
      icon: <Users className="h-4 w-4" />,
    },
  ],
  navPiquete: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Participações",
      url: "/piquetes/participacoes",
      icon: <List className="h-4 w-4" />,
    },
  ],
  navInstrutor: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      url: "/instrutor/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    // { title: "Detidos", url: "#", icon: <ShieldAlert className="h-4 w-4" /> },
    { title: "Mandados", url: "#", icon: <FileCheck className="h-4 w-4" /> },
  ],
  navSecretaria: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      url: "/secretaria/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      url: "/secretaria/direccoes",
      icon: <Building2 className="h-4 w-4" />,
    },
  ],
  navSecretariaGeral: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      url: "/secretaria-geral/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      url: "/secretaria-geral/direccoes",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      title: "Livros",
      url: "/secretaria-geral/livros",
      icon: <Book className="h-4 w-4" />,
    },
  ],
  navPgr: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      url: "/pgr/processos",
      icon: <List className="h-4 w-4" />,
    },
  ],
  navQuickAccess: [
    { title: "Definições", url: "#", icon: <Settings2 className="h-4 w-4" /> },
    { title: "Ajuda", url: "#", icon: <CircleHelp className="h-4 w-4" /> },
  ],
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    isAdmin,
    isDirector,
    isInstrutor,
    isSecretaria,
    isSecretariaGeral,
    isPGR,
    isPiquete,
    isPending,
    isHydrated,
  } = useUser();

  const loading = !isHydrated || isPending;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <SidebarHeader className="border-b border-sidebar-border/60 pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-14 items-center gap-3 px-1">
              {/* Logo badge */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground text-[11px] font-bold ring-2 ring-sidebar-primary/20">
                SIC
              </div>

              {/* App title */}
              <div className="grid leading-tight overflow-hidden">
                <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                  SIP
                </span>
                <span className="truncate text-[10px] font-medium uppercase tracking-[.15em] text-sidebar-foreground/50">
                  Instrução Processual
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <SidebarContent>
        {loading ? (
          <div className="space-y-2 px-3 py-4">
            {Object.keys(data).map((key) => (
              <Skeleton key={key} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {isAdmin && <NavMain items={data.navAdmin} title="Administrador" />}
            {isDirector && (
              <NavMain items={data.navDirector} title="Director" />
            )}
            {isInstrutor && (
              <NavMain items={data.navInstrutor} title="Instrutor" />
            )}
            {isSecretaria && (
              <NavMain items={data.navSecretaria} title="Secretaria" />
            )}
            {isSecretariaGeral && (
              <NavMain
                items={data.navSecretariaGeral}
                title="Secretaria Geral"
              />
            )}
            {isPGR && <NavMain items={data.navPgr} title="PGR" />}
            {isPiquete && <NavMain items={data.navPiquete} title="Piquete" />}

            <NavSecondary items={data.navQuickAccess} className="mt-auto" />
          </>
        )}
      </SidebarContent>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <SidebarFooter className="border-t border-sidebar-border/60">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
