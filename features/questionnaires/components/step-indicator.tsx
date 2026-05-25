"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === currentStep
                ? "w-6 bg-primary"
                : index < currentStep
                  ? "bg-primary/60"
                  : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
