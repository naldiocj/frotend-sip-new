"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createDiligencia } from "@/app/services/diligencia.service";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateDiligenciaData,
  createDiligenciaSchema,
} from "@/lib/schemas/diligencia.schema";
import { replaceChar } from "@/lib/utils";

export default function AddDiligenciaModal() {
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateDiligenciaData>({
    resolver: zodResolver(createDiligenciaSchema),
    defaultValues: {
      titulo: "",
      etapa: "",
      ordem: 1,
      descricao: "",
      prazo: "",
      estado: "PENDENTE",
      processoNumero: replaceChar(id as string, "-", "/"),
    },
  });

  function onSubmit(data: CreateDiligenciaData) {
    startTransition(async () => {
      try {
        await createDiligencia(data);
        toast.success("SUCESSO", {
          description: "Diligência registado com sucesso!",
        });
        setOpen(false);
        form.reset();
      } catch (error: any) {
        toast.error("ERRO", {
          description: error?.response?.data?.message,
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Registar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registar Diligência</DialogTitle>
          <DialogDescription>
            Registe uma nova diligência para este processo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="titulo"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Título</FieldLabel>
                <Input
                  {...field}
                  placeholder=""
                  value={field.value?.toUpperCase() || ""}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="etapa"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Etapa</FieldLabel>
                <Input {...field} placeholder="" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Controller
              control={form.control}
              name="ordem"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Ordem</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder=""
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      field.onChange(Number.isNaN(value) ? undefined : value);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="prazo"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Prazo</FieldLabel>
                  <Input {...field} type="date" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="estado"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Estado</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDENTE">Pendente</SelectItem>
                      <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="descricao"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Descrição</FieldLabel>
                <Textarea {...field} placeholder="" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <SubmitButton isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
