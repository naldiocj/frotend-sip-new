"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateAutoDeclaracaoDTO } from "@/lib/dto/documento.dto";
import { replaceChar } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, FileBadge2, FileText, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";

const createAutoDeclaracaoSchema = z.object({
  numeroFolha: z.string().min(1, "Informe o número da folha."),
  dataEmissao: z.string().min(1, "Informe a data de emissão."),
  descricao: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  endereco: z.string().min(5, "Informe o endereço."),
  processo: z.object({
    id: z.string().min(1, "Informe o ID do processo."),
    numero: z.string().min(1, "Informe o número do processo."),
  }),
  tipoDeclaracao: z.enum(["INICIAL", "ADITAMENTO"]),

  materiaAutos: z.string().min(10, "Informe a matéria dos autos."),
});

type AutoDeclaracaoFormValues = z.infer<typeof createAutoDeclaracaoSchema>;

function formatPreviewDate(value: string) {
  if (!value) return "____/____/________";

  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function buildPreviewTitle(
  tipoDeclaracao: CreateAutoDeclaracaoDTO["tipoDeclaracao"],
) {
  if (tipoDeclaracao === "ADITAMENTO") {
    return "Auto de Declaração - Aditamento";
  }

  return "Auto de Declaração";
}

export function EditorComponent() {
  const [isPending, startTransition] = useTransition();
  const { id } = useParams();

  const defaultValues: AutoDeclaracaoFormValues = {
    numeroFolha: "",
    dataEmissao: "",
    descricao: "",
    endereco: "",
    processo: {
      id: "",
      numero: replaceChar(id as string, "-", "/"),
    },
    tipoDeclaracao: "INICIAL",
    materiaAutos: "",
  };

  const form = useForm<AutoDeclaracaoFormValues>({
    resolver: zodResolver(createAutoDeclaracaoSchema),
    defaultValues,
  });

  const preview = useWatch({
    control: form.control,
  });

  function onSubmit(data: AutoDeclaracaoFormValues) {
    toast.success("Rascunho pronto", {
      description: `Auto de declaração do processo ${data.processo.numero || "sem número"} validado com sucesso.`,
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs ring-1 ring-foreground/5">
        <div className="mb-6 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Auto Declaração
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Editor do Documento
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Preencha os campos do modelo e acompanhe a composição do documento
            em tempo real.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <Controller
              control={form.control}
              name="numeroFolha"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                    <FileBadge2 className="h-4 w-4" />
                    Número da folha
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ex: 14"
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
              name="dataEmissao"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="h-4 w-4" />
                    Data de emissão
                  </FieldLabel>
                  <Input
                    {...field}
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <Controller
              control={form.control}
              name="processo.numero"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                    <FileText className="h-4 w-4" />
                    Número do processo
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ex: 001/2026"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            control={form.control}
            name="endereco"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4" />
                  Endereço
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="Ex: Bairro Azul, Rua Principal n.º 12"
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
            name="materiaAutos"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-sm font-semibold">
                  Matéria dos autos
                </FieldLabel>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Descreva a matéria dos autos tratada nesta declaração."
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
            name="descricao"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-sm font-semibold">
                  Descrição
                </FieldLabel>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder="Redija o conteúdo principal do auto de declaração."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(defaultValues)}
            >
              Limpar
            </Button>
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card p-4 shadow-xs ring-1 ring-foreground/5 lg:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
              Pré-visualização
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Documento em formato A4
            </h3>
          </div>
          <div className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Processo #{preview?.processo?.numero || "—"}
          </div>
        </div>

        <div className="overflow-auto rounded-2xl bg-muted/30 p-4 lg:p-8">
          <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-10 text-black shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
            <div className="flex min-h-full flex-col gap-8">
              <header className="space-y-5 border-b border-slate-200 pb-6 text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    className="p-0"
                    src="/insignia.jpg"
                    alt="Insignia da República"
                    width={60}
                    height={50}
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 leading-2">
                  República de Angola
                  <span className="block h-2"></span>
                  Ministério do Interior
                  <span className="block h-2"></span>
                  Serviço de Investigação Criminal
                </p>

                <div className="space-y-2 mt-14">
                  <h4 className="text-2xl font-bold uppercase tracking-wide text-slate-900">
                    {buildPreviewTitle(preview?.tipoDeclaracao ?? "INICIAL")}
                  </h4>
                  <p className="text-sm text-slate-600">
                    Processo n.º{" "}
                    {preview?.processo?.numero || "________________"}
                  </p>
                </div>
              </header>

              <div className="space-y-6 text-[15px] leading-8 text-slate-800">
                <p>
                  Aos {formatPreviewDate(preview?.dataEmissao || "")}, nesta
                  unidade de instrução processual, foi lavrado o presente auto
                  referente à folha n.º {preview?.numeroFolha || "________"}.
                </p>

                <p>
                  O presente termo é elaborado no âmbito do processo
                  identificado pelo número{" "}
                  {preview?.processo?.numero || "________________"}, na
                  modalidade{" "}
                  {preview?.tipoDeclaracao === "ADITAMENTO"
                    ? "de aditamento"
                    : "inicial"}
                  .
                </p>

                <p>
                  Quanto à matéria dos autos, consta:{" "}
                  {preview?.materiaAutos ||
                    "____________________________________________________________"}
                  .
                </p>

                <p>
                  O endereço relacionado aos factos ou à diligência é:{" "}
                  {preview?.endereco ||
                    "____________________________________________________________"}
                  .
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Declaração
                  </p>
                  <p className="mt-3 whitespace-pre-wrap">
                    {preview?.descricao ||
                      "O conteúdo descritivo da declaração aparecerá aqui à medida que o formulário for preenchido."}
                  </p>
                </div>
              </div>

              <footer className="mt-auto space-y-10 pt-12 text-sm text-slate-700">
                <div className="grid gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="border-b border-slate-400" />
                    <p className="text-center font-medium">Instrutor</p>
                  </div>
                  <div className="space-y-2">
                    <div className="border-b border-slate-400" />
                    <p className="text-center font-medium">Declarante</p>
                  </div>
                </div>

                <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500">
                  Documento gerado a partir do editor de auto de declaração
                </p>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
