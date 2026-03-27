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
import { DiligenciaItem } from "@/lib/dto/diligencias.dto";
import { CheckIcon, Inbox } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const orderStatus = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Order Placed",
    description: "Your order has been received and is being processed.",
  },
  {
    id: 2,
    date: "Mar 16, 2024",
    title: "Payment Confirmed",
    description: "Transaction successful. Preparing for shipment.",
  },
  {
    id: 3,
    date: "Mar 18, 2024",
    title: "Shipped",
    description: "Your package is on its way. Track your delivery.",
  },
  {
    id: 4,
    date: "Mar 20, 2024",
    title: "Delivered",
    description: "Package successfully delivered to the recipient.",
  },
];

interface iAppProps {
  data: DiligenciaItem[];
}

export function DiligenciasTimeLine({ data }: iAppProps) {
  return (
    <Card className="mt-4">
      <CardContent>
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
          <Timeline defaultValue={3} className="w-full max-w-md">
            {data.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="group-data-[orientation=vertical]/timeline:ms-10"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineDate>{item.createdAt}</TimelineDate>
                  <TimelineTitle>{item.titulo}</TimelineTitle>
                  <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                    <CheckIcon className="size-4 group-not-data-completed/timeline-item:hidden" />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent>{item.descricao}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  );
}
