import {
  Building2,
  Files,
  FolderKanban,
  FolderOpen,
  Gavel,
  Ticket,
  Users,
  Users2,
} from "lucide-react";

export const menuItems = [
  {
    title: "Administração",
    path: "#",
    icon: <Building2 className="h-8 w-8 text-white" />,
  },
  {
    title: "Instrutores",
    path: "/instrutor/dashboard",
    icon: <Users className="h-8 w-8 text-white" />,
  },
  {
    title: "Processos",
    path: "/fiscalizacao",
    icon: <FolderOpen className="h-8 w-8 text-white" />,
  },
  {
    title: "Piquetes",
    path: "/gestaoEequipas",
    icon: <Users2 className="h-8 w-8 text-white" />,
  },
  {
    title: "Mandados",
    path: "#",
    icon: <FolderKanban className="h-8 w-8 text-white" />,
  },
  {
    title: "Detidos",
    path: "/documental",
    icon: <Files className="h-8 w-8 text-white" />,
  },
  {
    title: "Relatórios",
    path: "/tickets",
    icon: <Ticket className="h-8 w-8 text-white" />,
  },
  {
    title: "PGR",
    path: "/tickets",
    icon: <Gavel className="h-8 w-8 text-white" />,
  },
];
