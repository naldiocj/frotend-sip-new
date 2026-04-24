"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUser } from "@/hooks/user-context";
import { BellRing } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserDropdownAvatar } from "./user-dropdown-avatar";

export function HeaderNav() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    router.push("/login");
  };

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-primary">
      <div className="container h-20 flex items-center justify-between px-6 mx-auto">
        <Image src="/sic.png" width={45} height={40} alt="insignia do sic" />

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
