"use client";

import { createDocumento } from "@/app/services/documento.service";
import { DOCUMENT_MODELS } from "@/lib/document-models";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { switchTemplate } from "@/lib/switch-template";
import { replaceChar, toUrl } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function DynamicDocumentForm({
  type,
}: {
  type: keyof typeof DOCUMENT_MODELS;
}) {
  const [isPending, startTransition] = useTransition();

  const model = DOCUMENT_MODELS[type] as unknown as {
    title: string;
    fields: any[];
  };

  const { id } = useParams();
  const numero = replaceChar(id as string, "-", "/");

  const Template = switchTemplate(type);

  const defaultValues = {
    processoNumero: numero,
    label: model.title,
    dataEmissao: new Date().toISOString().split("T")[0],
    ...model.fields.reduce((acc: any, field: any) => {
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

  const FIELDS_PER_PAGE = 10;
  const totalPages = Math.ceil(model.fields.length / FIELDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const getFieldsForPage = (page: number) => {
    const start = (page - 1) * FIELDS_PER_PAGE;
    return model.fields.slice(start, start + FIELDS_PER_PAGE);
  };

  const templateRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: templateRef,
    documentTitle: `Documento_${numero}`,
  });

  const onSubmit = async (data: any) => {
    const payload = {
      tipoModelo: type,
      numeroProcesso: data.processoNumero,
      conteudo: { ...data }, // O restante vira o "conteudo" no JSONB do Java
    };

    console.log(payload);

    startTransition(async () => {
      const documentId = await createDocumento(payload);

      // Update documento add arquivo from handlePrint

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
      <div className="overflow-hidden grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <section className="w-full rounded-2xl border border-border/60 bg-card p-8 shadow-xs ring-1 ring-foreground/5">
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
            {getFieldsForPage(currentPage).map((field) => (
              <FieldGroup
                key={`${field.name}-${currentPage}`}
                className="flex flex-col gap-4 mb-4"
              >
                <Field className="gap-1">
                  {!(field as any).hidden && field.type !== "checkbox" && (
                    <FieldLabel>{field.label}</FieldLabel>
                  )}
                  {field.type === "textarea" ? (
                    <Textarea
                      {...register(field.name)}
                      className="border p-2 rounded"
                    />
                  ) : field.type === "select" ? (
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: controllerField }) => (
                        <Select
                          value={controllerField.value || ""}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger className="border p-2 rounded">
                            <SelectValue
                              placeholder={field.value || "Selecionar..."}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options &&
                              field.options.map((option: any) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  ) : field.type === "checkbox" ? (
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: controllerField }) => (
                        <div className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            id={field.name}
                            checked={!!controllerField.value}
                            onChange={(e) =>
                              controllerField.onChange(e.target.checked)
                            }
                            className="peer sr-only"
                          />
                          <FieldLabel
                            htmlFor={field.name}
                            className={`relative w-6 h-6 flex items-center justify-center border rounded transition-colors cursor-pointer ${!!controllerField.value
                                ? "bg-primary border-primary"
                                : "bg-white border-gray-300"
                              }`}
                          >
                            {!!controllerField.value && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </FieldLabel>
                          <span className="ml-2">{field.label}</span>
                        </div>
                      )}
                    />
                  ) : (
                    <>
                      {(field as any).hidden ? (
                        <Input
                          type={field.type}
                          {...register(field.name)}
                          placeholder={(field as any)?.placeholder}
                          className="border p-2 rounded"
                          hidden={true}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          {...register(field.name)}
                          placeholder={(field as any)?.placeholder}
                          className="border p-2 rounded"
                          hidden={(field as any).hidden}
                        />
                      )}
                    </>
                  )}
                </Field>
              </FieldGroup>
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 py-2 border-t border-border/40">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Proximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => reset()}
              >
                Cancelar
              </Button>
              {currentPage === totalPages && (
                <SubmitButton isPending={isPending} />
              )}
            </div>
          </form>
        </section>
        <div className="space-y-4">
          {/* <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div> */}
          <section className="min-h-screen rounded-2xl border border-border/60 bg-card p-4 shadow-xs lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                  Pré-visualização
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {model.title}
                </h3>
              </div>
              <div className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                Processo #{preview?.processoNumero || "—"}
              </div>
            </div>
            <div ref={templateRef}>
              <Template preview={preview} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
