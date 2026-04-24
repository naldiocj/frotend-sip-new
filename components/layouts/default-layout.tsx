"use client";

import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="container mx-auto p-6 md:p-8">{children}</main>;
}
