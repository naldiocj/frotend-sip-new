"use client";

import { createTestemunha } from "@/app/services/participante.service";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestemunhaData } from "@/lib/dto/participante.dto";
import { createTestemunhaSchema } from "@/lib/schemas/participante.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  processoNumero?: string;
}

export function AddTestemunhaModal({ open, setOpen, processoNumero }: Props) {
  const { id } = useParams<{ id?: string }>();
  const resolvedProcessoNumero = processoNumero ?? id ?? "";
  const [isPending, startTransition] = useTransition();

  const form = useForm<TestemunhaData>({
    resolver: zodResolver(createTestemunhaSchema),
    defaultValues: {
      profissao: "Engenheiro",
      dataEmissaoBi: "2026-04-02",
      dataNascimento: "",
      email: "naldio@gmail.com",
      endereco: "Rua 1, Bairro 1, Cidade 1, Província 1",
      estadoCivil: "SOLTEIRO",
      idade: 1,
      naturalidade: "Luanda",
      nomeCompleto: "Naldio Joaquim",
      nomeMae: "Laura Joaquim",
      nomePai: "Luis Joaquim",
      numeroBi: "1234567890",
      telefone: "+244 933 333 333",
      processoNumero: resolvedProcessoNumero,
    },
  });

  function onSubmit(data: TestemunhaData) {
    startTransition(async () => {
      try {
        await createTestemunha(data);
        toast.success("SUCESSO", {
          description: "Testemunha registada com sucesso!",
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Testemunha</DialogTitle>
          <DialogDescription>
            Adicione uma testemunha a este processo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="processoNumero"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Número do Processo</FieldLabel>
                <Input
                  {...field}
                  readOnly={Boolean(resolvedProcessoNumero)}
                  placeholder="Ex: 123/2026"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="nomeCompleto"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Nome Completo</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="nomePai"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Nome do Pai</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="nomeMae"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Nome da Mãe</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="estadoCivil"
              render={({ field, fieldState }) => (
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="idade"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Idade</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="dataNascimento"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Data de Nascimento</FieldLabel>
                  <Input type="date" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="naturalidade"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Naturalidade</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="profissao"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Profissão</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="numeroBi"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Nº BI</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="dataEmissaoBi"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Data de Emissão do BI</FieldLabel>
                  <Input type="date" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="telefone"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Telefone</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="endereco"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Endereço</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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

