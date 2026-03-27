"use client";

import { NavigationMenuProcesso } from "@/components/navigation-menu-processo";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="px-4 flex flex-col gap-6">
      <NavigationMenuProcesso />
      <main className="flex-1">{children}</main>
    </div>
  );
}
