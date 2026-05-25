"use client";

import { cn } from "@/lib/utils";

interface ChipSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  error?: string;
  optional?: boolean;
}

export function ChipSelect({
  options,
  value,
  onChange,
  maxSelections,
  error,
  optional,
}: ChipSelectProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else if (!maxSelections || value.length < maxSelections) {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {optional && (
          <span className="text-xs text-muted-foreground">(optional)</span>
        )}
        {maxSelections && (
          <span className="text-xs text-muted-foreground">
            (max {maxSelections})
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          const isDisabled = !isSelected && maxSelections ? value.length >= maxSelections : false;

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              disabled={isDisabled}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "bg-primary text-white"
                  : isDisabled
                    ? "border border-box-border bg-background text-muted-foreground/50 cursor-not-allowed"
                    : "border border-box-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
