import { Calendar, Edit2, MoreVertical, Timer, Trash2 } from "lucide-react";
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
            <CardTitle className="text-center text-2xl font-black text-foreground light:group-hover:text-primary transition-colors">
              CAPA DO DOCUMENTO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-muted">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Pagina:{" "}
                <strong className="text-xs font-extrabold">
                  <Badge variant={"outline"}>{documento}</Badge>
                </strong>
              </div>
              <div className="flex flex-1 w-full items-center gap-2 text-xs font-medium text-muted-foreground">
                <Timer className="h-3 w-3" />
                20/12/2026
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-muted/50 bg-muted/5 mt-0">
            <GroupButtonDocumentos id={1} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
