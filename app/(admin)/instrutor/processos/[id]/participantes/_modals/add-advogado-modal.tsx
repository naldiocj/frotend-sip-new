"use client";

import { createAdvogado } from "@/app/services/participante.service";
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
import { Field, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdvogadoData } from "@/lib/dto/participante.dto";
import { createAdvogadoSchema } from "@/lib/schemas/participante.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface iAppProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export function AddAdvogadoModal({ open, setOpen }: iAppProps) {
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<AdvogadoData>({
    resolver: zodResolver(createAdvogadoSchema),
    defaultValues: {
      nomeCompleto: "",
      numeroCedula: "",
      telefone: "",
      processoNumero: id as string,
      tipoAdvogado: "DEFESA",
    },
  });

  function onSubmit(data: AdvogadoData) {
    startTransition(async () => {
      try {
        await createAdvogado(data);
        toast.success("SUCESSO", {
          description: "Advogado registado com sucesso!",
        });
        setOpen(false);
        form.reset();
      } catch (error: any) {
        toast.error("ERRO", {
          description: error?.message,
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advogado</DialogTitle>
          <DialogDescription>
            Adicione um advogado a este processo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="nomeCompleto"
            render={({ field }) => (
              <Field>
                <FieldLabel>Nome Completo</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="numeroCedula"
            render={({ field }) => (
              <Field>
                <FieldLabel>Número da Cédula</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <Field>
                <FieldLabel>Telefone</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tipoAdvogado"
            render={({ field }) => (
              <Field>
                <FieldLabel>Tipo de Advogado</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEFESA">Defesa</SelectItem>
                    <SelectItem value="ACUSACAO">Acusação</SelectItem>
                  </SelectContent>
                </Select>
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
