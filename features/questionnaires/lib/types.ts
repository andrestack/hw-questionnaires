import { type ZodTypeAny } from "zod";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select" | "radio" | "chips" | "tool-group";
  required: boolean;
  placeholder?: string;
  options?: string[];
  maxSelections?: number;
  toolFields?: { name: string; label: string }[];
}

export interface CardConfig {
  title: string;
  fields: FieldConfig[];
}

export interface QuestionnaireConfig {
  type: "start" | "audit";
  title: string;
  cards: CardConfig[];
  confirmationMessage: string;
  sheetTab: string;
  webhookUrlEnv: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}
