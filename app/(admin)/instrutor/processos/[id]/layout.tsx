"use client";

import { NavigationMenuProcesso } from "@/components/navigation-menu-processo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky nav bar */}
      <div className="sticky top-0 z-20 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/instrutor/processos">
              <ArrowLeft className="h-4 w-4" />
              Processos
            </Link>
          </Button>

          <div className="h-4 w-px bg-border/60" />

          <NavigationMenuProcesso />
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
