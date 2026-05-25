"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, optional, className, rows = 4, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-heading-1">
          {label}
          {optional && (
            <span className="text-xs text-muted-foreground">(optional)</span>
          )}
        </label>
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-xl border border-box-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
