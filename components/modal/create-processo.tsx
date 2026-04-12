"use client";

import { createProcesso } from "@/app/services/processo.service";
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
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TipoCrimeDTO } from "@/lib/dto/tipo-crime.dto";
import {
  CreateProcessoDTO,
  createProcessoSchema,
} from "@/lib/schemas/processo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CirclePlus,
  FileText,
  FolderOpen,
  Info,
  Loader2,
  Scale,
} from "lucide-react";
import { use, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

interface iAppProps {
  tiposCrimesPromise: Promise<TipoCrimeDTO[]>;
}

export function CreateProcessoModal({
  tiposCrimesPromise: tipoCrimesPromise,
}: iAppProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const tiposCrimes = use(tipoCrimesPromise).map((c) => ({
    label: c.descricao?.split(":")[0],
    value: String(c.id),
  }));

  const currentYear = new Date().getFullYear();

  const form = useForm({
    resolver: zodResolver(createProcessoSchema),
    defaultValues: {
      ano: currentYear,
      crimesIds: [],
      descricao: "",
      estadoProcesso: "EM_INSTRUCAO",
      nome: "",
      numero: "",
      tipoProcesso: "NORMAL",
    },
  });

  function onSubmit(data: CreateProcessoDTO) {
    startTransition(async () => {
      try {
        await createProcesso(data);
        toast.success("SUCESSO", {
          description: "Processo registado com sucesso!",
        });
        handleOpenChange();
      } catch (error: any) {
        toast.error("ERRO", {
          description: error?.message,
        });
      }
    });
  }

  function handleOpenChange() {
    form.reset();
    setOpen(!open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Registar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-2xl">Novo Processo</DialogTitle>
          <DialogDescription>
            Preencha os campos para iniciar um novo dossier.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FieldGroup className="space-y-2">
            <Controller
              control={form.control}
              name="numero"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Número do Processo
                  </FieldLabel>
                  <Input
                    {...field}
                    id="numero"
                    className="h-12 text-lg"
                    placeholder={`EX: 001/${currentYear}`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="space-y-2 flex gap-4">
            <Controller
              control={form.control}
              name="ano"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Ano
                  </FieldLabel>
                  <Input
                    {...field}
                    id="ano"
                    type="number"
                    className="h-12 text-lg"
                    value={field.value as number}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="tipoProcesso"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Tipo de Processo
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger
                      id="tipoProcesso"
                      className="w-auto py-6 text-sm"
                    >
                      <SelectValue placeholder="Selecione o tipo de processo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NORMAL">Normal</SelectItem>
                      <SelectItem value="AVERIGUACAO">Averiguação</SelectItem>
                      <SelectItem value="COM_DETIDO">Com detido</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              control={form.control}
              name="estadoProcesso"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Estado do Processo
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger className="w-auto py-6 text-sm">
                      <SelectValue placeholder="Selecione o estado do processo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EM_INSTRUCAO">Em instrução</SelectItem>
                      <SelectItem value="ARQUIVADO">Arquivado</SelectItem>
                      <SelectItem value="REMETIDO_JUIZO">
                        Remetido a juízo
                      </SelectItem>
                      <SelectItem value="REMETIDO_PGR">
                        Remetido à PGR
                      </SelectItem>
                      <SelectItem value="TRAMITADO">Tramitado</SelectItem>
                      <SelectItem value="SENTENCIADO">Sentenciado</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              control={form.control}
              name="crimesIds"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Crimes
                  </FieldLabel>
                  <MultiSelect
                    options={tiposCrimes}
                    onValueChange={field.onChange}
                    defaultValue={(field.value as any) || []}
                    placeholder="Selecione os crimes relacionados"
                    className="w-full"
                    maxCount={4}
                    searchable={true}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              control={form.control}
              name="descricao"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Descrição Sumária
                  </FieldLabel>
                  <Textarea
                    {...field}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Descreva brevemente a natureza do processo..."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-12 text-lg font-bold"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4" />
                Criando...
              </>
            ) : (
              "Criar Dossier"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
