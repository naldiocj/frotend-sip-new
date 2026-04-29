import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { UserProvider } from "@/hooks/user-context";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/components/providers/query-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk, Noto_Serif, Noto_Sans, Playfair_Display, JetBrains_Mono, Nunito_Sans, Raleway, DM_Sans, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const figtreeHeading = Figtree({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIP - Sistema de Instrução Processual",
  description:
    "Desenvolver uma plataforma digital para gerenciar e processar instruções processuais, modernizando fluxos jurídicos tradicionais através de solução tecnológica moderna e escalável, recorrendo as boas práticas de engenharia de software, visando entregar uma plataforma confiável, segura e de fácil manutenção para do processo de instrução processual de forma eficiente e profissional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn( figtreeHeading.variable, jetbrainsMono.variable, "font-sans", inter.variable)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <UserProvider>
                  {children}
                  <Toaster richColors closeButton />
                </UserProvider>
              </TooltipProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
