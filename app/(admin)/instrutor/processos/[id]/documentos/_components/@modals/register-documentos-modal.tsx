"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parsers } from "@/lib/searchparams";
import { CirclePlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { DOCUMENT_CATEGORIES } from "../../_utils/constants";
import { filterDocumentos } from "../../_utils/extensions";
import { CreateDocumento, PecaCategory } from "../../_utils/types";

export default function RegisterDocumentosModal() {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();

  const [documentos, setDocumentos] =
    useState<PecaCategory[]>(DOCUMENT_CATEGORIES);

  const [query, setQuery] = useQueryState("q", {
    ...parsers.q,
    defaultValue: "",
    shallow: true, // Não faz refresh da página inteira
    throttleMs: 500, // Debounce embutido!
    clearOnDefault: true,
  });

  useEffect(() => {
    if (!query) {
      setDocumentos(DOCUMENT_CATEGORIES);
      return;
    }
    setDocumentos(filterDocumentos(query.toLowerCase()));
  }, [query]);

  const [formData, setFormData] = useState<CreateDocumento>({
    titulo: "",
    tipo: "",
    descricao: "",
    arquivo: null,
  });

  const handleTypeSelection = (typeLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo: typeLabel,
      titulo: `${typeLabel} - ${(id as string) || ""}`,
    }));
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus />
            Registar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden max-h-[90vh]">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl">
              Selecionar Tipo de Documento
            </DialogTitle>
            <DialogDescription>
              Escolha o tipo de documento que deseja registar ao processo.
            </DialogDescription>
            <Input
              value={query}
              placeholder="Pesquisar por número ou descrição..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </DialogHeader>
          <ScrollArea className="h-[60vh] p-6 pt-2">
            <div className="space-y-6">
              {documentos.map((category, catIdx) => (
                <div key={catIdx} className="space-y-3">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-1 border-l-4 border-primary/20">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.items.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTypeSelection(doc.label)}
                        className="flex flex-col items-center justify-center p-4 gap-3 rounded-xl border-2 border-muted bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group text-center h-full min-h-[120px]"
                      >
                        <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform shadow-sm">
                          <doc.icon className="h-6 w-6" />
                        </div>
                        <span className="font-semibold text-xs leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {doc.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
