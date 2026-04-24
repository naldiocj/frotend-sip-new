import { HeaderNavModules } from "@/components/header-nav-modules";
import BaseLayout from "@/components/layouts/base-layout";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <HeaderNavModules />
      <BaseLayout>{children}</BaseLayout>
    </>
  );
}
