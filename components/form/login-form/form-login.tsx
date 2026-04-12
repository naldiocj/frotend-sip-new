"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import login from "@/app/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/user-context";
import { PATHS } from "@/lib/constants";
import { LoginFormDTO, loginFormSchema } from "@/lib/schemas/login.schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";

export function LoginForm({ className }: React.ComponentProps<"form">) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const { setUser } = useUser();

  const form = useForm<LoginFormDTO>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@sic.gov.ao",
      password: "123456",
    },
  });

  function onSubmit(values: LoginFormDTO) {
    startTransition(async () => {
      const response = await login(values);
      if (response.status === 200) {
        try {
          const user = response.data || null;
          if (!user) {
            toast.error("Erro ao obter sessão do utilizador.");
            return;
          }
          setUser(user);
        } catch (e) {
          alert(e);
        }
        toast.success("Login realizado com sucesso!", {
          description: "Você foi autenticado com êxito.",
        });
        router.push(PATHS.DASHBOARD);
      } else if (response.status === 401) {
        toast.error("Credenciais inválidas.", {
          description: "Por favor, faça login novamente.",
        });
      }
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        method="POST"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Acesso ao SIP</CardTitle>
          <CardDescription>
            Use suas credenciais institucionais para gerenciar processos e
            diligências.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-0">
                  <FieldLabel
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium"
                  >
                    Usuário ou Email
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="usuario@sic.gov.ao"
                    autoComplete="username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-0">
                  <FieldLabel
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <Input {...field} type="password" placeholder="••••••••" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button disabled={isPending} type="submit">
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Acesso seguro para instrutores, secretarias e diretores do SIP.
            </p>
          </FieldGroup>
        </CardContent>
      </form>
    </Card>
  );
}

export function LoginFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg bg-card shadow-sm max-w-md w-full mx-auto p-8">
        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2" />
            <div className="h-10 bg-muted rounded" />
          </div>
          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2" />
            <div className="h-10 bg-muted rounded" />
          </div>
          <div className="h-9 bg-muted rounded mt-4" />
        </div>
      </div>
    </div>
  );
}
