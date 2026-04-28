"use client";

import { atribuirInstrutor } from "@/app/services/direccao.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InstrutorDetailDTO } from "@/lib/dto/direcao.dto";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { Building2, Loader2, SendHorizontal } from "lucide-react";
import { use, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

interface AtribuirDirecaoModalProps {
  direccoesPromise: Promise<DireccaoDTO[]>;
  instrutoresPromise: Promise<InstrutorDetailDTO[]>;
  processosPromise: Promise<ProcessoListItem[]> | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  processoId: string;
  direcaoId: string;
}

export function AtribuirInstrutorModal({
  direccoesPromise,
  processosPromise,
  instrutoresPromise,
  direcaoId,
  open,
  setOpen,
  processoId,
}: AtribuirDirecaoModalProps) {
  const [instrutorId, setInstrutorId] = useState("");
  const [isPending, startTransition] = useTransition();

  const direccoes = direccoesPromise ? use(direccoesPromise) : [];
  const processos = processosPromise ? use(processosPromise!) : [];
  const instrutores = instrutoresPromise
    ? use(instrutoresPromise!).filter((i) => i.direcao.id === Number(direcaoId))
    : [];

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
    setInstrutorId("");
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetState();
    }
  }

  function handleSubmit() {
    if (!processoId || !instrutorId) {
      toast.error("ERRO", {
        description: "Selecione o instrutor antes de confirmar.",
      });
      return;
    }

    startTransition(async () => {
      try {
        await atribuirInstrutor({
          processoId: Number(processoId),
          instrutorId: Number(instrutorId),
        });

        toast.success("SUCESSO", {
          description: `A instrutor foi atribuida ao processo ${processoSelecionado?.numero}.`,
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
            Atribuir Instrutor ao Processo
          </DialogTitle>
          <DialogDescription>
            Escolha Instrutor responsavel para concluir a distribuição.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                <Building2 className="h-4 w-4" />
                Instrutor
              </FieldLabel>

              <Select value={instrutorId} onValueChange={setInstrutorId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o instrutor" />
                </SelectTrigger>
                <SelectContent>
                  {instrutores.map((instrutor) => (
                    <SelectItem key={instrutor.id} value={String(instrutor.id)}>
                      {instrutor.nomeCompleto} - {instrutor.direcao?.sigla}
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
