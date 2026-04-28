import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileX className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Página não encontrada
            </CardTitle>
            <CardDescription className="text-base">
              A página que procura não existe ou foi movida.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Verifique o URL ou navegue até uma página válida.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button variant="outline" asChild className="gap-2">
            <Link href="javascript:history.back()" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}