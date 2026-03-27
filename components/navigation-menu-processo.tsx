"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { cn, toUrl } from "@/lib/utils";
import { ClipboardList, FileText, FolderIcon, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuProcesso() {
  const params = useParams();
  const id = params.id as string;
  const pathname = usePathname();

  const [active, setActive] = useState("");

  const menuProcesso = [
    {
      title: "Dossier",
      icon: FolderIcon,
      url: toUrl(INSTRUTOR_PATHS.PROCESSOS_RESUMO, id),
    },
    {
      title: "Diligências",
      icon: ClipboardList,
      url: toUrl(INSTRUTOR_PATHS.PROCESSOS_DILIGENCIAS, id),
    },
    {
      title: "Documentos",
      icon: FileText,
      url: toUrl(INSTRUTOR_PATHS.PROCESSOS_DOCUMENTOS, id),
    },
    {
      title: "Participantes",
      icon: Users,
      url: toUrl(INSTRUTOR_PATHS.PROCESSOS_PARTICIPANTES, id),
    },
  ];

  useEffect(() => {
    setActive(pathname);
  }, []);

  return (
    <NavigationMenu className="px-4">
      <NavigationMenuList className="gap-4">
        {menuProcesso.map((processo) => (
          <NavigationMenuItem key={processo.title}>
            <NavigationMenuLink
              className={cn(
                "hover:bg-gray-50  dark:hover:bg-black transition-transform duration-600",
                active === processo.url &&
                "bg-black dark:bg-blue-800 text-white",
              )}
              href={processo.url}
            >
              <span className="flex items-center gap-2">
                <processo.icon className="w-4 h-4" />
                {processo.title}
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
