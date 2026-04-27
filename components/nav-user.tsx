"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user-context";
import { deleteSession } from "@/lib/session";
import {
  CircleUserRoundIcon,
  EllipsisVerticalIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { setUser, user } = useUser();

  function handleLogout() {
    deleteSession();
    setUser(null);
    router.push("/");
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Skeleton className="h-16 w-full rounded-2xl" />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="group flex w-full items-center gap-3 py-7 border border-border bg-card px-3 text-left transition hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-accent/30">
              <Avatar className="h-11 w-11 rounded-2xl bg-primary/10 text-primary">
                <AvatarImage src={undefined} alt={user.name} />
                <AvatarFallback className="rounded-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <EllipsisVerticalIcon className="size-4 text-muted-foreground transition group-hover:text-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="border border-border bg-card p-3 shadow-lg shadow-black/5 dark:shadow-white/5"
            side={isMobile ? "bottom" : "top"}
            align="center"
            sideOffset={10}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer transition hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/perfil">
                  <CircleUserRoundIcon className="mr-2 size-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer transition hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOutIcon className="mr-2 size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
