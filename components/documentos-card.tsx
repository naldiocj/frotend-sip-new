import { convertData } from "@/lib/date-utils";
import {
  Calendar,
  Clock,
  Edit2,
  MoreVertical,
  Scale,
  Trash2,
} from "lucide-react";
import { GroupButtonDocumentos } from "./group-button-documentos";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DocumentosCard() {
  return (
    <div className="flex gap-4">
      {[1, 2, 3].map((documento) => (
        <Card
          key={documento}
          className="relative overflow-hidden border-l-4 border-l-black dark:border-l-primary hover:shadow-xl transition-all duration-300 group cursor-default"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className="mb-2 bg-primary-foreground text-primary p-3"
              >
                Tipo de documento
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-2xl font-black text-foreground light:group-hover:text-primary transition-colors">
              [STATIC] 002/2026-PGR-AE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[100px] text-sm text-muted-foreground line-clamp-4 leading-relaxed italic">
              "[STATIC]" {"Sem descrição detalhada disponível."}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-muted">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Ano: [STATIC] 2026
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                {convertData(new Date() as any)}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground col-span-2">
                <Scale className="h-3 w-3" />
                Tipo: [STATIC] XX
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-muted/50 bg-muted/5 mt-4">
            {/* <Link
              href={`${INSTRUTOR_PATHS.PROCESSOS}/${replaceAllChar("202-2026-PGR-AE", "/", "-")}`}
              className="w-full"
            >
              <Button
                variant="link"
                className="px-0 h-10 text-primary font-bold group-hover:translate-x-1 transition-transform"
              >
                Abrir Documento
              </Button>
            </Link> */}
            <GroupButtonDocumentos id={1} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
