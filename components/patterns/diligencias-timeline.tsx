import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { convertData } from "@/lib/date-utils";
import { DiligenciaItem } from "@/lib/dto/diligencias.dto";
import { cn } from "@/lib/utils";
import { CheckIcon, Inbox } from "lucide-react";

interface iAppProps {
  data: DiligenciaItem[];
}

function EstadoBadge({ estado }: { estado: string }) {
  const isConcluida = estado === "CONCLUIDA";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[.2em]",
        isConcluida
          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
          : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
      )}
    >
      {isConcluida ? "Concluída" : "Pendente"}
    </span>
  );
}

export function DiligenciasTimeLine({ data }: iAppProps) {
  const completedCount = data.filter((d) => d.estado === "CONCLUIDA").length;

  return (
    <div className="p-6 lg:p-8">
      {data.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>Sem registos</EmptyTitle>
            <EmptyDescription>
              Não foram encontradas diligências para este processo.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Timeline defaultValue={completedCount} className="w-full">
          {data.map((item, index) => (
            <TimelineItem
              key={item.id}
              step={index + 1}
              className="group-data-[orientation=vertical]/timeline:ms-10"
            >
              <TimelineHeader>
                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />

                {/* Date */}
                <TimelineDate className="font-mono text-[11px]">
                  {convertData(item.createdAt)}
                </TimelineDate>

                {/* Title row */}
                <div className="flex flex-wrap items-center gap-2">
                  <TimelineTitle className="text-sm font-semibold text-foreground">
                    {item.titulo}
                  </TimelineTitle>
                  <EstadoBadge estado={item.estado} />
                </div>

                {/* Indicator */}
                <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                  <CheckIcon className="size-4 group-not-data-completed/timeline-item:hidden" />
                </TimelineIndicator>
              </TimelineHeader>

              {/* Etapa + Description */}
              <TimelineContent className="mt-2 space-y-2">
                {item.etapa && (
                  <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-muted-foreground/70">
                    {item.etapa}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.descricao}
                </p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </div>
  );
}
