"use client";

import { createDespacho } from "@/app/services/despacho.service";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CreateDespachoData, createDespachoSchema } from "@/lib/schemas/despacho.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export function AddDespachosModal({ open, setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateDespachoData>({
    resolver: zodResolver(createDespachoSchema),
    defaultValues: {
      numeroProcesso: "",
      decisao: "",
      dataDespacho: new Date().toISOString().split("T")[0],
      autoridadeResponsavel: "",
      observacoes: "",
      isFinalizado: false,
    },
  });

  function onSubmit(data: CreateDespachoData) {
    startTransition(async () => {
      try {
        await createDespacho(data);
        toast.success("SUCESSO", {
          description: "Despacho registado com sucesso!",
        });
        setOpen(false);
        form.reset();
      } catch (error: any) {
        toast.error("ERRO", { description: error?.message });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Despacho</DialogTitle>
          <DialogDescription>Registe um novo despacho.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="numeroProcesso"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Número do Processo</FieldLabel>
                <Input {...field} placeholder="Ex: 123/2026" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="decisao"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Decisão</FieldLabel>
                <Input {...field} placeholder="Ex: Deferido / Indeferido..." />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="dataDespacho"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Data do Despacho</FieldLabel>
                  <Input type="date" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="autoridadeResponsavel"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Autoridade Responsável</FieldLabel>
                  <Input {...field} placeholder="Nome da autoridade" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="observacoes"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Observações</FieldLabel>
                <Input {...field} placeholder="Opcional" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="isFinalizado"
            render={({ field }) => (
              <Field>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                  <div>
                    <FieldLabel>Finalizado</FieldLabel>
                    <p className="text-xs text-muted-foreground">
                      Marque se o despacho já foi concluído.
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
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

