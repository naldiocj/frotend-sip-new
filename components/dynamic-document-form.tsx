"use client";

import { useForm, useWatch } from "react-hook-form";
import { DOCUMENT_MODELS } from "@/lib/document-models";
import { useParams } from "next/navigation";
import { replaceChar } from "@/lib/utils";
import { SubmitButton } from "./submit-button";
import { useTransition } from "react";
import { switchTemplate } from "@/lib/switch-template";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { toUrl } from "@/lib/utils";
import { createDocumento } from "@/app/services/documento.service";
import { toast } from "sonner";

export default function DynamicDocumentForm({
  type,
}: {
  type: keyof typeof DOCUMENT_MODELS;
}) {
  const [isPending, startTransition] = useTransition();
  const model = DOCUMENT_MODELS[type];

  const { id } = useParams();
  const numero = replaceChar(id as string, "-", "/");

  const Template = switchTemplate(type);

  const defaultValues = {
    processoNumero: numero,
    label: model.title,
    dataEmissao: new Date().toISOString().split("T")[0],
    ...model.fields.reduce((acc, field) => {
      if (field.value !== "") acc[field.name] = field.value;
      return acc;
    }, {} as any),
  };

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const preview = useWatch({
    control: control,
  });

  const onSubmit = async (data: any) => {
    const payload = {
      tipoModelo: type,
      numeroProcesso: data.numeroProcesso,
      conteudo: { ...data }, // O restante vira o "conteudo" no JSONB do Java
    };

    startTransition(async () => {
      await createDocumento(payload);

      toast.success("SUCESSO", {
        description: "Documento criado com sucesso!",
      });
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-2 ml-0 gap-1.5 px-3 text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href={toUrl(INSTRUTOR_PATHS.PROCESSOS_DOCUMENTOS, id as string)}>
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Documentos
        </Link>
      </Button>
      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs ring-1 ring-foreground/5">
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
              {model.title}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Editor do Documento
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Preencha os campos do modelo e acompanhe a composição do documento
              em tempo real.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {model.fields.map((field) => (
              <FieldGroup key={field.name} className="flex flex-col gap-4 mb-4">
                <Field className="gap-1">
                  <FieldLabel>{field.label}</FieldLabel>
                  {field.type === "textarea" ? (
                    <Textarea
                      {...register(field.name)}
                      className="border p-2 rounded"
                    />
                  ) : (
                    <Input
                      type={field.type}
                      {...register(field.name)}
                      placeholder={field.placeholder}
                      className="border p-2 rounded"
                    />
                  )}
                </Field>
              </FieldGroup>
            ))}

            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => reset()}
              >
                Cancelar
              </Button>
              <SubmitButton isPending={isPending} />
            </div>
          </form>
        </section>
        <Template preview={preview} />
      </div>
    </>
  );
}
