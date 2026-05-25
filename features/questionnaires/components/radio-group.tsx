"use client";

import { cn } from "@/lib/utils";

interface RadioGroupProps {
  name: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
  optional,
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {optional && (
          <span className="text-xs text-muted-foreground">(optional)</span>
        )}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all hover:bg-primary/5",
              value === option
                ? "border-primary bg-primary/10"
                : "border-box-border"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm text-foreground">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
