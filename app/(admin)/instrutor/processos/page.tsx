import { getProcessos } from "@/app/services/processo.service";
import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import LibraryProcesso from "@/components/library/library-processos";
import { CreateProcessoModal } from "@/components/modal/create-processo";
import {
  ProcessoDataTable,
  SkeletonProcessDataTable,
} from "@/components/table/processo-data-table";
import SearchProcesso from "@/components/table/search-processo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchParamsCache } from "@/lib/searchparams";
import { Library, TableIcon } from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  const processosPromise = getProcessos(q);
  const tiposCrimesPromise = getTiposCrimes();

  const refreshKey = await processosPromise.then((p) =>
    p.map((p) => p.id).join(","),
  );

  return (
    <Tabs
      defaultValue="library-mode"
      className="w-full flex-col justify-start gap-6"
      id="tab-processos-page"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="library-mode">
            <Library />
            Modo Livrária
          </TabsTrigger>
          <TabsTrigger value="list-mode">
            <TableIcon />
            Modo Lista
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex justify-between px-4 lg:px-6 gap-4">
        <SearchProcesso promise={processosPromise} />
        <CreateProcessoModal tiposCrimesPromise={tiposCrimesPromise} />
      </div>
      <TabsContent
        value="list-mode"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <Suspense
          fallback={<SkeletonProcessDataTable promise={processosPromise} />}
        >
          <ProcessoDataTable key={refreshKey} promise={processosPromise} />
        </Suspense>
      </TabsContent>
      <TabsContent value="library-mode" className="flex flex-col px-4 lg:px-6">
        <LibraryProcesso promise={processosPromise} />
      </TabsContent>
    </Tabs>
  );
}
