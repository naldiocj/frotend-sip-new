"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/**
 * Returns true when the given `url` matches the current `pathname`.
 * Uses prefix matching for section routes (e.g. /instrutor/processos → active
 * on /instrutor/processos/123 and its children).
 */
function isPathActive(pathname: string, url: string): boolean {
  if (!url || url === "#") return false;
  return pathname === url || pathname.startsWith(url + "/");
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function NavMain({
  items,
  title,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[.2em] text-sidebar-foreground/40 mb-1">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = isPathActive(pathname, item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={active}
                  className={cn(
                    "transition-colors duration-150",
                    active
                      ? "bg-primary! dark:bg-primary/60! text-white! dark:text-primary font-medium hover:bg-primary/15 hover:text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                  asChild
                >
                  <Link
                    href={item.url}
                    prefetch={false}
                    onMouseEnter={() =>
                      item.url !== "#" && router.prefetch(item.url)
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
