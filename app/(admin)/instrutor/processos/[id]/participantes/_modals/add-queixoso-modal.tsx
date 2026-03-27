"use client";

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

import { createQueixosoSchema } from "@/lib/schemas/participante.schema";

import { QueixosoData } from "@/lib/dto/participante.dto";

import { createQueixoso } from "@/app/services/participante.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface iAppProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export function AddQueixoModal({ open, setOpen }: iAppProps) {
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<QueixosoData>({
    resolver: zodResolver(createQueixosoSchema),
    defaultValues: {
      profissao: "",
      dataEmissaoBi: "",
      dataNascimento: "",
      email: "",
      endereco: "",
      estadoCivil: "",
      idade: 1,
      naturalidade: "",
      nomeCompleto: "",
      nomeMae: "",
      nomePai: "",
      numeroBi: "",
      telefone: "",
      processoId: Number(id),
    },
  });

  function onSubmit(data: QueixosoData) {
    startTransition(async () => {
      try {
        await createQueixoso(data);
        toast.success("SUCESSO", {
          description: "Queixoso registado com sucesso!",
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Queixoso</DialogTitle>
          <DialogDescription>
            Adicione um queixoso a este processo.
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
            name="nomePai"
            render={({ field }) => (
              <Field>
                <FieldLabel>Nome do Pai</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="nomeMae"
            render={({ field }) => (
              <Field>
                <FieldLabel>Nome da Mãe</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="estadoCivil"
            render={({ field }) => (
              <Field>
                <FieldLabel>Estado Civil</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLTEIRO">Solteiro(a)</SelectItem>
                    <SelectItem value="CASADO">Casado(a)</SelectItem>
                    <SelectItem value="DIVORCIADO">Divorciado(a)</SelectItem>
                    <SelectItem value="VIUVO">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="idade"
            render={({ field }) => (
              <Field>
                <FieldLabel>Idade</FieldLabel>
                <Input type="number" {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <Field>
                <FieldLabel>Data de Nascimento</FieldLabel>
                <Input type="date" {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="naturalidade"
            render={({ field }) => (
              <Field>
                <FieldLabel>Naturalidade</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="profissao"
            render={({ field }) => (
              <Field>
                <FieldLabel>Profissão</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="numeroBi"
            render={({ field }) => (
              <Field>
                <FieldLabel>Nº BI</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="dataEmissaoBi"
            render={({ field }) => (
              <Field>
                <FieldLabel>Data de Emissão do BI</FieldLabel>
                <Input type="date" {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" {...field} />
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
            name="endereco"
            render={({ field }) => (
              <Field>
                <FieldLabel>Endereço</FieldLabel>
                <Input {...field} />
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
            <Button type="submit">Vincular</Button>
            <SubmitButton isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
