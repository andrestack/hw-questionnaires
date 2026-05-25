"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodTypeAny } from "zod";
import { Card } from "./card";
import { StepIndicator } from "./step-indicator";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";
import { RadioGroup } from "./radio-group";
import { ChipSelect } from "./chip-select";
import { ConfirmationScreen } from "./confirmation-screen";
import { type CardConfig, type SubmitResult } from "../lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface QuestionnaireShellProps {
  cards: CardConfig[];
  schema: ZodTypeAny;
  onSubmit: (data: Record<string, unknown>) => Promise<SubmitResult>;
  confirmationMessage: string;
}

export function QuestionnaireShell({
  cards,
  schema,
  onSubmit,
  confirmationMessage,
}: QuestionnaireShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema as never),
    mode: "onChange",
  });

  const currentCard = cards[currentStep];
  const isLastStep = currentStep === cards.length - 1;

  const getFieldNames = useCallback((card: CardConfig) => {
    return card.fields.map((f) => f.name);
  }, []);

  const handleNext = async () => {
    const fieldNames = getFieldNames(currentCard);
    const isValid = await trigger(fieldNames);

    if (isValid) {
      if (typeof document !== "undefined" && "startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setCurrentStep((prev) => Math.min(prev + 1, cards.length - 1));
        });
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, cards.length - 1));
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      if (typeof document !== "undefined" && "startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setCurrentStep((prev) => prev - 1);
        });
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };

  const onFormSubmit = async (data: unknown) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await onSubmit(data as Record<string, unknown>);
      if (result.success) {
        setIsComplete(true);
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    const name = getValues("name") || getValues("fullName") || "there";
    return (
      <Card>
        <ConfirmationScreen
          name={name as string}
          message={confirmationMessage}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={currentStep} totalSteps={cards.length} />

      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-heading-1">
            {currentCard.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {currentCard.fields.map((field) => (
            <div key={field.name}>
              {field.type === "text" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <TextField
                      label={field.label}
                      placeholder={field.placeholder}
                      optional={!field.required}
                      error={errors[field.name]?.message as string}
                      {...formField}
                    />
                  )}
                />
              )}

              {field.type === "email" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <TextField
                      type="email"
                      label={field.label}
                      placeholder={field.placeholder}
                      optional={!field.required}
                      error={errors[field.name]?.message as string}
                      {...formField}
                    />
                  )}
                />
              )}

              {field.type === "url" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <TextField
                      type="url"
                      label={field.label}
                      placeholder={field.placeholder}
                      optional={!field.required}
                      error={errors[field.name]?.message as string}
                      {...formField}
                    />
                  )}
                />
              )}

              {field.type === "textarea" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <TextareaField
                      label={field.label}
                      placeholder={field.placeholder}
                      optional={!field.required}
                      error={errors[field.name]?.message as string}
                      {...formField}
                    />
                  )}
                />
              )}

              {field.type === "select" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-heading-1">
                        {field.label}
                        {!field.required && (
                          <span className="text-xs text-muted-foreground">(optional)</span>
                        )}
                      </label>
                      <select
                        {...formField}
                        className={cn(
                          "w-full rounded-xl border border-box-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                          errors[field.name] && "border-destructive focus:border-destructive focus:ring-destructive/20"
                        )}
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className="text-xs text-destructive">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}

              {field.type === "radio" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-heading-1">
                        {field.label}
                        {!field.required && (
                          <span className="text-xs text-muted-foreground">(optional)</span>
                        )}
                      </label>
                      <RadioGroup
                        name={field.name}
                        options={field.options || []}
                        value={formField.value}
                        onChange={formField.onChange}
                        error={errors[field.name]?.message as string}
                      />
                    </div>
                  )}
                />
              )}

              {field.type === "chips" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: formField }) => (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-heading-1">
                        {field.label}
                        {!field.required && (
                          <span className="text-xs text-muted-foreground">(optional)</span>
                        )}
                      </label>
                      <ChipSelect
                        options={field.options || []}
                        value={formField.value || []}
                        onChange={formField.onChange}
                        maxSelections={field.maxSelections}
                        error={errors[field.name]?.message as string}
                      />
                    </div>
                  )}
                />
              )}

              {field.type === "tool-group" && (
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-heading-1">
                    {field.label}
                  </label>
                  <div className="space-y-3">
                    {field.toolFields?.map((toolField) => (
                      <Controller
                        key={toolField.name}
                        name={toolField.name}
                        control={control}
                        render={({ field: formField }) => (
                          <TextField
                            label={toolField.label}
                            placeholder="e.g. Gmail, Xero, Trello"
                            optional={toolField.name !== "clientCommunication"}
                            error={errors[toolField.name]?.message as string}
                            {...formField}
                          />
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {submitError && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all",
                currentStep === 0
                  ? "invisible"
                  : "border border-box-border text-foreground hover:bg-secondary/10"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
