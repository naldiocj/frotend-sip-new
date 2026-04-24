"use client";

import { ReactNode } from "react";

export default function WelcomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="container mx-auto p-6 md:p-8">{children}</main>;
}
