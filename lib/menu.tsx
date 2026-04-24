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

export const menuItems = {
  navAdmin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Usuários",
      path: "/admin/usuarios",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Crimes",
      path: "/admin/tipos-de-crimes",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Categorias",
      path: "/admin/categorias",
      icon: <Folder className="h-4 w-4" />,
    },
    {
      title: "Patentes",
      path: "/admin/patentes",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      path: "/admin/direccoes",
      icon: <Folder className="h-4 w-4" />,
    },
    {
      title: "Auditoria",
      path: "/admin/auditoria",
      icon: <History className="h-4 w-4" />,
    },
  ],
  navDirector: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      path: "/director/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Instrutores",
      path: "/director/instrutores",
      icon: <Users className="h-4 w-4" />,
    },
  ],
  navPiquete: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Participações",
      path: "/piquetes/participacoes",
      icon: <List className="h-4 w-4" />,
    },
  ],
  navInstrutor: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      path: "/instrutor/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    { title: "Mandados", path: "#", icon: <FileCheck className="h-4 w-4" /> },
  ],
  navSecretaria: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      path: "/secretaria/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      path: "/secretaria/direccoes",
      icon: <Building2 className="h-4 w-4" />,
    },
  ],
  navSecretariaGeral: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      path: "/secretaria-geral/processos",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Direcções",
      path: "/secretaria-geral/direccoes",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      title: "Livros",
      path: "/secretaria-geral/livros",
      icon: <Book className="h-4 w-4" />,
    },
  ],
  navPgr: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Processos",
      path: "/pgr/processos",
      icon: <List className="h-4 w-4" />,
    },
  ],
  navQuickAccess: [
    { title: "Definições", path: "#", icon: <Settings2 className="h-4 w-4" /> },
    { title: "Ajuda", path: "#", icon: <CircleHelp className="h-4 w-4" /> },
  ],
};
