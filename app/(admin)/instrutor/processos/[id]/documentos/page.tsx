import { DocumentosCard } from "@/components/documentos-card";
import { DocumentosDataTable } from "@/components/patterns/documentos-datatable";
import SearchDocumento from "@/components/table/search-documento";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlus, LayoutGrid, TableProperties, Upload } from "lucide-react";

export default function Page() {
  return (
    <>
      <header className="flex justify-end gap-4">
        <Button>
          <CirclePlus />
          Registar
        </Button>
        <Button className="bg-green-600 hover:bg-green-600">
          <Upload />
          Carregar
        </Button>
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
              <SearchDocumento promise={new Promise(() => [])} />
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
