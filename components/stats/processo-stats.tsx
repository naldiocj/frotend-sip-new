import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DashboardMetric = {
  label: string;
  value: string;
};

export type MainDashboardData = {
  title: string;
  description: string;
  metrics: DashboardMetric[];
};

type WidgetProps = {
  mainDashboard: MainDashboardData;
};

export function ProcessoStats({ mainDashboard }: WidgetProps) {
  return (
    <div className="max-w-7xl w-full">
      <Card className="p-0 ring-0 border rounded-2xl relative h-full ">
        <CardContent className="p-0">
          <div className="ps-6 py-4 flex flex-col gap-9 justify-between">
            <div>
              <p className="text-lg font-medium text-card-foreground">
                {mainDashboard.title}
              </p>
              <p className="text-xs font-normal text-muted-foreground">
                {mainDashboard.description}
              </p>
            </div>
            <div className="flex items-center gap-6">
              {mainDashboard.metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div>
                    <p className="text-xs font-normal text-muted-foreground">
                      {metric.label}
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-medium text-card-foreground">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                  {index < mainDashboard.metrics.length - 1 && (
                    <Separator orientation="vertical" className={"h-12"} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
