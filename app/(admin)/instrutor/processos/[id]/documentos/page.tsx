import { DocumentosCard } from "@/components/documentos-card";
import { DocumentosDataTable } from "@/components/patterns/documentos-datatable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, TableProperties } from "lucide-react";
import RegisterDocumentosModal from "./_components/@modals/register-documentos-modal";
import SearchDocumento from "./_components/search-documentos";
import CarregarDocumentosModal from "./_components/@modals/carregar-documentos-modal";

export default function Page() {
  return (
    <>
      <header className="flex justify-end gap-4">
        <RegisterDocumentosModal />
        <CarregarDocumentosModal />
      </header>

      <div className="gap-5">
        <Tabs defaultValue="card">
          <TabsList className="flex justify-start gap-2">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Modo Livrária
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <TableProperties className="w-4 h-4" />
              Modo Tabela
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <div className="space-y-5">
              <SearchDocumento />
              <DocumentosCard />
            </div>
          </TabsContent>
          <TabsContent value="table">
            <DocumentosDataTable data={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
