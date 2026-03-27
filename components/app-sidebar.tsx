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
import { useUser } from "@/hooks/user-context";
import {
  Activity,
  CameraIcon,
  ChartBarIcon,
  CircleHelpIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileCheck,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpen,
  LayoutDashboard,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  Settings2Icon,
  ShieldAlert,
  UsersIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <FolderIcon />,
    },
    {
      title: "Team",
      url: "#",
      icon: <UsersIcon />,
    },
  ],
  navAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Usuários",
      url: "/admin/usuarios",
      icon: <UsersIcon />,
    },
    {
      title: "Crimes",
      url: "/admin/acompanhamentos",
      icon: <ChartBarIcon />,
    },
    {
      title: "Categorias",
      url: "/admin/categorias",
      icon: <FolderIcon />,
    },
    {
      title: "Patentes",
      url: "/admin/patentes",
      icon: <FolderIcon />,
    },
    {
      title: "Direcções",
      url: "/admin/direccoes",
      icon: <FolderIcon />,
    },
  ],
  navDirector: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Processos",
      url: "/directores/processos",
      icon: <UsersIcon />,
    },
    {
      title: "Instrutores",
      url: "/directores/instrutores",
      icon: <ChartBarIcon />,
    },
  ],
  navPiquete: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Participações",
      url: "/piquetes/participacoes",
      icon: <ListIcon />,
    },
  ],
  navInstrutor: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Processos",
      url: "/instrutor/processos",
      icon: <FolderOpen />,
    },
    {
      title: "Acompanhamentos",
      url: "#",
      icon: <Activity />,
    },
    {
      title: "Detidos",
      url: "#",
      icon: <ShieldAlert />,
    },
    {
      title: "Mandados",
      url: "#",
      icon: <FileCheck />,
    },
  ],
  navSecretaria: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Secretaria",
      url: "/secretaria/processos",
      icon: <ListIcon />,
    },
    {
      title: "Direcções",
      url: "/secretaria/direcoes",
      icon: <ChartBarIcon />,
    },
  ],
  navPgr: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Processos",
      url: "/pgr/processos",
      icon: <ListIcon />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <CameraIcon />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  navQuickAccess: [
    {
      title: "Definições",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: <CircleHelpIcon />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <FileIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    isAdmin,
    isDirector,
    isInstrutor,
    isSecretaria,
    isPGR,
    isPiquete,
    isPending,
  } = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 space-y-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                SIC
              </div>
              <div className="flex flex-col w-10 h-10">
                <span className="font-bold text-sm">SIP</span>
                <span className="text-xs text-muted-foreground">INST</span>
              </div>
            </div>
            <Separator />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isPending && <>Loading...</>}
        {isAdmin && <NavMain items={data.navAdmin} title="Admin" />}
        {isDirector && <NavMain items={data.navDirector} title="Director" />}
        {isInstrutor && <NavMain items={data.navInstrutor} title="Instrutor" />}
        {isSecretaria && (
          <NavMain items={data.navSecretaria} title="Secretaria" />
        )}
        {isPGR && <NavMain items={data.navPgr} title="PGR" />}
        {isPiquete && <NavMain items={data.navPiquete} title="Piquete" />}

        <NavSecondary items={data.navQuickAccess} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
