"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { memo, ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  path: string;
};

const DashboardCard = memo(({ title, icon, path }: Props) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(path)}
      className="relative group bg-white rounded-2xl p-6 hover:bg-linear-to-br from-primary/5 to-primary/5 transition-all duration-300 w-full"
    >
      <CardContent className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-primary/20 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300" />
      <CardContent className="relative flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>
        <CardTitle>
          <h3 className="text-primary font-semibold text-lg whitespace-nowrap group-hover:scale-105 transition-all duration-300">
            {title}
          </h3>
        </CardTitle>
      </CardContent>
    </Card>
  );
});

DashboardCard.displayName = "DashboardCard";

export default DashboardCard;
