import { getParticipantes } from "@/app/services/participante.service";
import { ParticipantesDataTable } from "@/components/patterns/participantes-datatable";
import { ParticipantesDropdown } from "@/components/patterns/participantes-dropdown";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getParticipantes(id);

  return (
    <>
      <header className="flex justify-end">
        <ParticipantesDropdown />
      </header>
      <ParticipantesDataTable data={data} />
    </>
  );
}
