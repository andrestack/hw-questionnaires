"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-box-border bg-box-bg/80 p-6 shadow-lg backdrop-blur-sm sm:p-8",
        className
      )}
      style={{ viewTransitionName: "card" }}
    >
      {children}
    </div>
  );
}
