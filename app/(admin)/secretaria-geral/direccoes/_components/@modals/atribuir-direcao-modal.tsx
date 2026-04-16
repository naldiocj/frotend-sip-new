"use client";

import { atribuirDirecao } from "@/app/services/direccao.service";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import {
  Building2,
  Loader2,
  Search,
  SendHorizontal,
  Folder,
} from "lucide-react";
import { use, useMemo, useState, useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface AtribuirDirecaoModalProps {
  direccoesPromise: Promise<DireccaoDTO[]>;
  processosPromise: Promise<ProcessoListItem[]> | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  processoId: string;
}

export function AtribuirDirecaoModal({
  direccoesPromise,
  processosPromise,
  open,
  setOpen,
  processoId,
}: AtribuirDirecaoModalProps) {
  const [direccaoId, setDireccaoId] = useState("");
  const [isPending, startTransition] = useTransition();

  const direccoes = direccoesPromise ? use(direccoesPromise) : [];
  const processos = processosPromise ? use(processosPromise!) : [];

  const processosOrdenados = useMemo(
    () =>
      [...processos].sort((a, b) =>
        a.numero.localeCompare(b.numero, undefined, { numeric: true }),
      ),
    [processos],
  );

  const processoSelecionado = processosOrdenados.find(
    (processo) => String(processo.id) === processoId,
  );

  function resetState() {
    setDireccaoId("");
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetState();
    }
  }

  function handleSubmit() {
    if (!processoId || !direccaoId) {
      toast.error("ERRO", {
        description: "Selecione o processo e a direcção antes de confirmar.",
      });
      return;
    }

    startTransition(async () => {
      try {
        await atribuirDirecao({
          processoId: Number(processoId),
          direccaoId: Number(direccaoId),
        });

        toast.success("SUCESSO", {
          description: `A direcção foi atribuida ao processo ${processoSelecionado?.numero}.`,
        });
        handleOpenChange(false);
      } catch (error: any) {
        toast.error("ERRO", {
          description: error?.message,
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Atribuir Direcção ao Processo
          </DialogTitle>
          <DialogDescription>
            Escolha Direcção responsavel para concluir a distribuição.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                <Building2 className="h-4 w-4" />
                Direcção
              </FieldLabel>
              <Select value={direccaoId} onValueChange={setDireccaoId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a direcção" />
                </SelectTrigger>
                <SelectContent>
                  {direccoes.map((direccao) => (
                    <SelectItem key={direccao.id} value={String(direccao.id)}>
                      {direccao.nome} ({direccao.sigla})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          {processoSelecionado && (
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm">
              <p className="font-semibold text-foreground">
                Processo selecionado: {processoSelecionado.numero}
              </p>
              <p className="mt-1 text-muted-foreground">
                {processoSelecionado.nome ||
                  processoSelecionado.descricao ||
                  "Sem descricao disponivel."}
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Atribuindo...
                </>
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4" />
                  Confirmar atribuição
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AtribuirDirecaoModal;
