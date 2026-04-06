"use client";

import { getProcessoById } from "@/app/services/processo.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ProcessoItem } from "@/lib/dto/processo.dto";

import { cn } from "@/lib/utils";

import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  FileCheck,
  FileQuestion,
  FileSearch,
  FileSignature,
  FileText,
  FileWarning,
  FolderOpen,
  Gavel,
  Hash,
  History,
  Layers,
  Lock,
  Plus,
  Scale,
  ScrollText,
  Search,
  Send,
  Shield,
  Siren,
  Stamp,
  Tag,
  Upload,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

type PecaProcessual = {
  id: number;
  titulo: string;
  tipo: string;
  descricao?: string;
  fileName: string;
  fileSize: string;
  dataEntrada: Date;
  autor: string;
};

type Diligencia = {
  id: number;
  titulo: string;
  tipo: string;
  descricao: string;
  data: Date;
  status: "pendente" | "em_andamento" | "concluida";
  autor: string;
};

type PecaCategory = {
  title: string;
  items: { icon: any; label: string }[];
};

const DOCUMENT_CATEGORIES: PecaCategory[] = [
  {
    title: "Autos",
    items: [
      { icon: FileText, label: "Auto de Declaração" },
      { icon: FileText, label: "Auto de Declaração em Aditamento" },
      { icon: FileWarning, label: "Auto de Denúncia" },
      { icon: Briefcase, label: "Auto de Diligência" },
      { icon: User, label: "Auto de Constituição de Arguido" },
      { icon: FileQuestion, label: "Auto de Interrogatório" },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Objectos",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Pessoas",
      },
      { icon: Gavel, label: "Auto de Busca e Apreensão" },
      { icon: FileSignature, label: "Auto de Depoimento Directo" },
      { icon: FileSignature, label: "Auto de Depoimento Indirecto" },
      { icon: FileSearch, label: "Auto de Exame Directo" },
      { icon: FileSearch, label: "Auto de Exame Directo e Avaliação" },
      { icon: History, label: "Auto de Reconstituição" },
      { icon: FileWarning, label: "Auto de Corpo de Delito Directo" },
      { icon: FileWarning, label: "Auto de Corpo de Delito Indireto" },
      { icon: Stamp, label: "Auto de Restituição" },
      { icon: Users, label: "Auto de Acarcação" },
    ],
  },
  {
    title: "Mandados",
    items: [
      { icon: Gavel, label: "Mandado de Detenção" },
      { icon: Shield, label: "Mandado de Custódia" },
      { icon: Search, label: "Mandado de Busca e Apreensão" },
      { icon: FileCheck, label: "Mandado de Soltura" },
      { icon: Siren, label: "Mandado de Captura" },
    ],
  },
  {
    title: "Termos",
    items: [
      { icon: FileSignature, label: "Termo de Identidade e Residência" },
      { icon: Stamp, label: "Termo de Entrega" },
      { icon: Send, label: "Termo de Remessa" },
      { icon: Lock, label: "Termo de Confidencialidade" },
      { icon: FileCheck, label: "Termo de Recebimento" },
    ],
  },
  {
    title: "Cota",
    items: [{ icon: ScrollText, label: "Cota" }],
  },
  {
    title: "Requisições",
    items: [
      { icon: FileSearch, label: "Perícia / Exame" },
      { icon: FileText, label: "Informação Criminal" },
    ],
  },
  {
    title: "Ofícios",
    items: [{ icon: FolderOpen, label: "Ofício de Remessa" }],
  },
];

export default function ProcessoDetailPage({
  params,
}: {
  params: Promise<{ id: string | number }>;
}) {
  const { id } = use(params);

  const [processo, setProcesso] = useState<ProcessoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [pecas, setPecas] = React.useState<PecaProcessual[]>([]);
  const [diligencias, setDiligencias] = React.useState<Diligencia[]>([]);
  const [modalDiligencia, setModalDiligencia] = React.useState<boolean>(false);
  const [modalQueixoso, setModalQueixoso] = React.useState<boolean>(false);
  const [modalArguido, setModalArguido] = React.useState<boolean>(false);
  const [modalTestemunha, setModalTestemunha] = React.useState<boolean>(false);
  const [modalAdvogado, setModalAdvogado] = React.useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [step, setStep] = React.useState<"selection" | "form">("selection");
  const [formData, setFormData] = React.useState<{
    titulo: string;
    tipo: string;
    descricao: string;
    arquivo: File | null;
  }>({
    titulo: "",
    tipo: "",
    descricao: "",
    arquivo: null,
  });

  const [isDiligenciaOpen, setIsDiligenciaOpen] = React.useState(false);
  const [diligenciaData, setDiligenciaData] = React.useState({
    titulo: "",
    tipo: "Auto de Queixa",
    descricao: "",
    data: "",
  });

  React.useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => {
        setStep("selection");
        setFormData({ titulo: "", tipo: "", descricao: "", arquivo: null });
      }, 300);
    }
  }, [isDialogOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelection = (typeLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo: typeLabel,
      titulo: `${typeLabel} - ${processo?.numero || ""}`,
    }));
    setStep("form");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, arquivo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.tipo || !formData.arquivo) return;
    const newPeca: PecaProcessual = {
      id: pecas.length + 1,
      titulo: formData.titulo,
      tipo: formData.tipo,
      descricao: formData.descricao,
      fileName: formData.arquivo.name,
      fileSize: formatBytes(formData.arquivo.size),
      dataEntrada: new Date(),
      autor: "Agente João Manuel",
    };
    setPecas([newPeca, ...pecas]);
    setIsDialogOpen(false);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KiB", "MiB", "GiB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  useEffect(() => {
    fetchProcessoById();
  }, []);

  async function fetchProcessoById() {
    try {
      const response = await getProcessoById(id as string);
      setProcesso(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">A carregar processo...</p>
        </div>
      </div>
    );
  }

  if (!processo) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <AlertTriangle className="h-16 w-16 text-warning" />
        <h2 className="text-2xl font-bold">Processo não encontrado</h2>
        <Link href="/processos">
          <Button variant="outline">Voltar para a Lista</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      {/* ── CAPA DO DOSSIER ──────────────────────────────── */}
      <div className="relative">
        <div className="relative px-4 pt-6">
          {/* Back nav */}
          <Link href="/processos">
            <Button
              variant="ghost"
              size="sm"
              className="pl-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 -ml-1 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a Lista de Processos
            </Button>
          </Link>

          {/* Main header row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:pl-6">
            {/* Left: identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-600 text-[10px] font-black tracking-[0.2em] uppercase">
                  <Shield className="h-3 w-3" />
                  Dossier Criminal
                </span>
                <EstadoBadge estado={processo.estadoProcesso} />
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase mb-3">
                  Nº do Processo
                </p>
                <h1 className="text-4xl md:text-4xl font-black tracking-tighter font-mono leading-none">
                  {processo.numero}
                </h1>
              </div>

              {processo.nome && (
                <p className="text-lg font-light text-muted-foreground tracking-wide">
                  {processo.nome}
                </p>
              )}
            </div>

            {/* Right: action buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => setModalDiligencia(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Diligência
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Layers className="h-3.5 w-3.5" />
                    Documento <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-md p-2">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <FileText className="h-3.5 w-3.5" />
                      Registar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDiligenciaOpen(true)}>
                      <Upload className="h-3.5 w-3.5" />
                      Carregar Documento
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog
                open={isDiligenciaOpen}
                onOpenChange={setIsDiligenciaOpen}
              >
                {/* Dialog content below */}
                <DialogContent className="sm:max-w-4xl p-0 overflow-hidden max-h-[90vh]">
                  {step === "selection" ? (
                    <>
                      <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-2xl">
                          Selecionar Tipo de Peça
                        </DialogTitle>
                        <DialogDescription>
                          Escolha o tipo de documento que deseja adicionar ao
                          processo.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] p-6 pt-2">
                        <div className="space-y-6">
                          {DOCUMENT_CATEGORIES.map((category, catIdx) => (
                            <div key={catIdx} className="space-y-3">
                              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-1 border-l-4 border-primary/20">
                                {category.title}
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.items.map((doc, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      handleTypeSelection(doc.label)
                                    }
                                    className="flex flex-col items-center justify-center p-4 gap-3 rounded-xl border-2 border-muted bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group text-center h-full min-h-[120px]"
                                  >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform shadow-sm">
                                      <doc.icon className="h-6 w-6" />
                                    </div>
                                    <span className="font-semibold text-xs leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                      {doc.label}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </>
                  ) : (
                    <>
                      <DialogHeader className="p-6 pb-2 border-b">
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-2 h-8 w-8 p-0"
                            onClick={() => setStep("selection")}
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <DialogTitle>Nova Peça: {formData.tipo}</DialogTitle>
                        </div>
                        <DialogDescription>
                          Preencha os detalhes e carregue o ficheiro
                          correspondente.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tipo de Peça</Label>
                              <Input
                                value={formData.tipo}
                                disabled
                                className="bg-muted font-medium"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="titulo">
                                Título do Documento
                              </Label>
                              <Input
                                id="titulo"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="descricao">
                              Descrição (Opcional)
                            </Label>
                            <Textarea
                              id="descricao"
                              name="descricao"
                              placeholder="Breve descrição do conteúdo..."
                              value={formData.descricao}
                              onChange={handleInputChange}
                              className="resize-none min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Ficheiro (PDF, DOCX, JPG)</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer relative">
                              <input
                                id="arquivo"
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                required
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <FolderOpen className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {formData.arquivo
                                    ? formData.arquivo.name
                                    : "Clique para carregar ou arraste o ficheiro"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF, DOCX, JPG (Máx. 10MB)
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              disabled={
                                !formData.titulo ||
                                !formData.tipo ||
                                !formData.arquivo
                              }
                            >
                              Confirmar e Adicionar
                            </Button>
                          </DialogFooter>
                        </form>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Users className="h-3.5 w-3.5" />
                    Participantes <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border shadow-md p-2"
                >
                  <DropdownMenuItem onClick={() => setModalQueixoso(true)}>
                    Queixoso
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setModalArguido(true)}>
                    Arguido
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setModalTestemunha(true)}>
                    Testemunha
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setModalAdvogado(true)}>
                    Advogado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* ── Metadata strip ── */}
          <div className="mt-8 md:mx-4 grid grid-cols-2 sm:grid-cols-4 gap-0 border border-border rounded-t-xl overflow-hidden bg-card">
            {[
              {
                icon: Scale,
                label: "Tipologia",
                value:
                  TIPO_PROCESSO[processo.tipoProcesso] ?? processo.tipoProcesso,
              },
              { icon: Calendar, label: "Ano Judicial", value: processo.ano },
              {
                icon: Gavel,
                label: "Crimes Imputados",
                value: processo.crimes?.length ?? 0,
              },
              {
                icon: Clock,
                label: "Registado em",
                value: convertData(processo.createdAt as any),
              },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-1 px-5 py-4 border-border",
                  i !== 3 && "border-r",
                )}
              >
                <div className="flex items-center gap-1.5 text-slate-500">
                  <item.icon className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <span className="font-black dark:text-white text-lg leading-tight mt-1">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900 */}

      {/* ── CRIMES BANNER ────────────────────────────────── */}
      {processo.crimes && processo.crimes.length > 0 && (
        <div className="mx-8 py-3 dark:bg-amber-950/40 bg-amber-400/40 border-b dark:border-amber-800/30 border-blue-800/30 flex items-start gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2 pl-4">
            <span className="text-[10px] font-black dark:text-amber-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0 mt-1.5">
              <Gavel className="h-3.5 w-3.5" />
              Crimes:
            </span>
            {processo.crimes.map((crime) => (
              <span
                key={crime.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 dark:bg-amber-900/50 bg-amber-50 dark:text-amber-300 text-amber-800 text-xs font-semibold rounded-full border dark:border-amber-700/50"
              >
                {crime.descricao.split(":")[0]}
                {crime.artigoPenal && (
                  <span className="dark:text-amber-800 text-amber-500 text-[10px]">
                    Art. {crime.artigoPenal}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* ── Tabs & conteúdo principal ── */}
          <div className="space-y-6">
            {/* Tabs */}
            <Tabs defaultValue="cronologia" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-11 bg-muted/50 p-1 border rounded-xl">
                <TabsTrigger
                  value="cronologia"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-bold"
                >
                  Diligências
                </TabsTrigger>
                <TabsTrigger
                  value="dados-processo"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-bold"
                >
                  Dados do Processo
                </TabsTrigger>
                <TabsTrigger
                  value="intervenientes"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-bold"
                >
                  Intervenientes
                </TabsTrigger>
                <TabsTrigger
                  value="documentos"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-bold"
                >
                  Peças Processuais
                </TabsTrigger>
              </TabsList>

              <DiligenciasLine refresh={modalDiligencia} />

              <TabsContent value="intervenientes" className="mt-4">
                <Card className="border-0 ring-1 ring-border overflow-hidden">
                  <CardHeader className="pb-3 border-b bg-muted/30 py-4 px-5">
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Intervenientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    {/* <div className="flex flex-col items-center text-center py-6 space-y-3">
                      <Users className="h-8 w-8 text-muted-foreground/25" />
                      <p className="text-sm text-muted-foreground">
                        Sem participantes vinculados
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setIsVincularParticipanteOpen(true)}
                      >
                        <Plus className="h-3.5 w-3.5" /> Vincular
                      </Button>
                    </div> */}
                    <ParticipantesTable isSaved={isSaved} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="mt-4">
                {/* {pecas.length > 0 ? (
                  <div className="space-y-3">
                    {pecas.map((peca) => (
                      <Card
                        key={peca.id}
                        className="border hover:border-primary/30 transition-all group overflow-hidden"
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform dark:bg-red-950/50 dark:border-red-900">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="font-bold text-sm truncate">
                                {peca.titulo}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {peca.tipo}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {peca.dataEntrada.toLocaleDateString("pt-PT")}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {peca.autor}
                              </span>
                              <span>{peca.fileSize}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary h-8 w-8"
                          >
                            <FolderOpen className="h-3.5 w-3.5" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        className="gap-2"
                        size="sm"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4" /> Carregar Novo Documento
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Card className="border">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                        <FileText className="h-10 w-10 text-muted-foreground/30" />
                        <div className="space-y-1">
                          <h4 className="font-bold">
                            Repositório Digital Vazio
                          </h4>
                          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                            O dossier digital ainda não contém ficheiros ou
                            peças processuais digitalizadas.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="gap-2 border-2"
                          size="sm"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4" /> Carregar Documento
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )} */}
                <TimelinePecas />
              </TabsContent>

              <TabsContent value="dados-processo" className="mt-4">
                {/* Dados do Processo — all schema fields */}
                <Card className="border-0 shadow-sm ring-1 ring-border overflow-hidden">
                  <CardHeader className="bg-muted/40 border-b py-4 px-6">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Dados do Processo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                      {/* numero */}
                      <div className="px-6 py-4 space-y-1 sm:border-b border-border">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Hash className="h-3 w-3" /> Número do Processo
                        </dt>
                        <dd className="font-black text-xl font-mono">
                          {processo.numero}
                        </dd>
                      </div>
                      {/* nome */}
                      <div className="px-6 py-4 space-y-1 sm:border-b border-border">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Tag className="h-3 w-3" /> Nome / Designação
                        </dt>
                        <dd className="font-semibold text-base">
                          {processo.nome || (
                            <span className="text-muted-foreground italic text-sm">
                              Não atribuído
                            </span>
                          )}
                        </dd>
                      </div>
                      {/* tipoProcesso */}
                      <div className="px-6 py-4 space-y-1 sm:border-b border-border">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Scale className="h-3 w-3" /> Tipo de Processo
                        </dt>
                        <dd>
                          <span
                            className={cn(
                              "inline-block px-2.5 py-1 rounded-md text-xs font-bold",
                              processo.tipoProcesso === "COM_DETIDO"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : processo.tipoProcesso === "AVERIGUACAO"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-muted text-foreground",
                            )}
                          >
                            {TIPO_PROCESSO[processo.tipoProcesso] ??
                              processo.tipoProcesso}
                          </span>
                        </dd>
                      </div>
                      {/* estadoProcesso */}
                      <div className="px-6 py-4 space-y-1 sm:border-b border-border">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Shield className="h-3 w-3" /> Estado
                        </dt>
                        <dd>
                          <Badge
                            className={cn(
                              "text-xs font-bold",
                              processo.estadoProcesso === "EM_INSTRUCAO" &&
                              "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
                              processo.estadoProcesso === "ARQUIVADO" &&
                              "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
                              processo.estadoProcesso === "REMETIDO_JUIZO" &&
                              "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
                              processo.estadoProcesso === "REMETIDO_PGR" &&
                              "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
                              processo.estadoProcesso === "TRAMITADO" &&
                              "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400",
                              processo.estadoProcesso === "SENTENCIADO" &&
                              "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
                            )}
                          >
                            {convertEstadoProcessoToUpperCase(
                              processo.estadoProcesso,
                            )}
                          </Badge>
                        </dd>
                      </div>
                      {/* ano */}
                      <div className="px-6 py-4 space-y-1">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Calendar className="h-3 w-3" /> Ano Judicial
                        </dt>
                        <dd className="font-black text-xl">{processo.ano}</dd>
                      </div>
                      {/* descricao */}
                      <div className="px-6 py-4 space-y-1">
                        <dt className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <FileText className="h-3 w-3" /> Descrição / Matéria
                        </dt>
                        <dd className="text-sm leading-relaxed">
                          {processo.descricao || (
                            <span className="text-muted-foreground italic">
                              Sem descrição
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
