"use client";

import { Shield } from "lucide-react";

export function Preloading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Background Circle */}
        <div className="absolute h-24 w-24 rounded-full bg-primary/20 animate-ping opacity-75" />

        {/* Rotating Outer Ring */}
        <div className="absolute h-20 w-20 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/50 border-l-transparent animate-spin" />

        {/* Central Icon */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg">
          <Shield
            className="h-8 w-8 text-primary animate-pulse"
            fill="currentColor"
            fillOpacity={0.2}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold tracking-widest text-primary animate-pulse">
          SIP
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          Sistema de Instrução Processual
        </p>
        <div className="flex gap-1 mt-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}
