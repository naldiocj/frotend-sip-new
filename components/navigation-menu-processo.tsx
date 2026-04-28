"use client";

import { INSTRUTOR_PATHS } from "@/lib/path";
import { cn } from "@/lib/utils";
import { toUrl } from "@/lib/utils-func";
import { ClipboardList, FileText, FolderOpen, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dossier",
    icon: FolderOpen,
    key: "resumo",
    url: INSTRUTOR_PATHS.PROCESSOS_RESUMO,
  },
  {
    title: "Diligências",
    icon: ClipboardList,
    key: "diligencias",
    url: INSTRUTOR_PATHS.PROCESSOS_DILIGENCIAS,
  },
  {
    title: "Documentos",
    icon: FileText,
    key: "documentos",
    url: INSTRUTOR_PATHS.PROCESSOS_DOCUMENTOS,
  },
  {
    title: "Participantes",
    icon: Users,
    key: "participantes",
    url: INSTRUTOR_PATHS.PROCESSOS_PARTICIPANTES,
  },
];

function isActive(pathname: string, href: string, key: string): boolean {
  if (key === "resumo") {
    // Exact match for the root process page
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavigationMenuProcesso() {
  const params = useParams();
  const id = params.id as string;
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação do processo">
      {/* Pill container */}
      <div className="inline-flex items-center gap-1 rounded-xl border border-border/50 bg-muted/50 p-1 dark:bg-muted/30">
        {menuItems.map((item) => {
          const href = toUrl(item.url, id);
          const active = isActive(pathname, href, item.key);

          return (
            <Link
              key={item.key}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50",
                active
                  ? "bg-background text-foreground shadow-xs ring-1 ring-border/40 dark:bg-card dark:ring-border/30"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground dark:hover:bg-background/10",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted-foreground/70",
                )}
              />
              <span>{item.title}</span>

              {/* Active dot indicator */}
              {active && (
                <span className="absolute -bottom-[5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary opacity-0" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
