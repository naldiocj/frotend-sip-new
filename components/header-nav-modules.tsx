"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUser } from "@/hooks/user-context";
import { menuItems } from "@/lib/menu";
import { BellRing } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { UserDropdownAvatar } from "./user-dropdown-avatar";

interface NavProps {
  menu: {
    path: string;
    icon: JSX.Element;
    title: string;
  };
}

function NavItem({ menu }: NavProps) {
  return (
    <Link
      href={menu.path}
      key={menu.path}
      className="flex gap-1 items-center text-white"
    >
      {menu.icon}
      {menu.title}
    </Link>
  );
}

export function HeaderNavModules() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    router.push("/login");
  };

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

  return (
    <div className="bg-primary">
      <div className="container h-20 flex items-center justify-between px-6 mx-auto">
        <div className="flex gap-4">
          <Image src="/sic.png" width={45} height={40} alt="insignia do sic" />
          {isAdmin && menuItems.navAdmin.map((menu) => <NavItem menu={menu} />)}
          {isDirector &&
            menuItems.navDirector.map((menu) => <NavItem menu={menu} />)}
          {isInstrutor &&
            menuItems.navInstrutor.map((menu) => <NavItem menu={menu} />)}
          {isSecretaria &&
            menuItems.navSecretaria.map((menu) => <NavItem menu={menu} />)}
          {isSecretariaGeral &&
            menuItems.navSecretariaGeral.map((menu) => <NavItem menu={menu} />)}
          {isPGR && menuItems.navPgr.map((menu) => <NavItem menu={menu} />)}
          {isPiquete &&
            menuItems.navPiquete.map((menu) => <NavItem menu={menu} />)}
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Button variant={"outline"} className="border-none">
            <BellRing />
          </Button>
          <UserDropdownAvatar />
        </div>
      </div>
    </div>
  );
}
