"use client";

import { uploadDocumento } from "@/app/services/upload-documento";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { replaceChar } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { useParams } from "next/navigation";
import { UploadDocumento } from "../../_utils/types";

interface iAppProps {
  formData: UploadDocumento;
  open: boolean;
  setOpen: (state: boolean) => void;
  setFormData: (data: any) => void;
}

export default function UploadDocumentosModal({
  formData,
  setFormData,
  open,
  setOpen,
}: iAppProps) {
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.tipo || !formData.arquivo) return;

    const form = new FormData();

    // titulo: string;
    // tipo: string;
    // descricao: string;
    // arquivo: File | null;
    // url: string;

    form.append("titulo", formData.titulo);
    form.append("tipo", formData.tipo);
    form.append("descricao", formData.descricao);
    form.append("arquivo", formData.arquivo);
    form.append("processoNumero", replaceChar(id as string, "-", "/"));

    uploadDocumento(form);
    // setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: any) => ({ ...prev, arquivo: e.target.files![0] }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 sm:max-w-2xl">
        <DialogHeader className="pt-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <DialogTitle>Nova Peça: {formData.tipo}</DialogTitle>
          </div>
          <DialogDescription>
            Preencha os detalhes e carregue o ficheiro correspondente.
          </DialogDescription>
        </DialogHeader>
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
              <Label htmlFor="titulo">Título do Documento</Label>
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
            <Label htmlFor="descricao">Descrição (Opcional)</Label>
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
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!formData.titulo || !formData.tipo || !formData.arquivo}
            >
              Registar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
