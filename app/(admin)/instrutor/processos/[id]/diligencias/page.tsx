import { getDiligencias } from "@/app/services/diligencia.service";
import { DiligenciasTimeLine } from "@/components/patterns/diligencias-timeline";
import AddDiligenciaModal from "./_components/add-diligencia-modal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const diligencias = await getDiligencias(id);

  return (
    <>
      <header className="flex justify-end">
        <AddDiligenciaModal />
      </header>
      <DiligenciasTimeLine data={diligencias} />
    </>
  );
}
