import { z } from "zod";

// Card 1 — Your Business
const card1Schema = z.object({
  businessType: z.string().min(1, "Please select your business type"),
  teamSize: z.string().min(1, "Please select your team size"),
  biggestTimeDrain: z.string().min(1, "Please share what's eating your time"),
});

// Card 2 — What You're Repeating
const card2Schema = z.object({
  repeatedTasks: z.array(z.string()).min(1, "Select at least one task"),
  weeklyAdminHours: z.string().min(1, "Please select weekly admin hours"),
  fiveHoursMeaning: z.string().min(1, "Please share what you'd do with extra time"),
});

// Card 3 — Your Tools
const card3Schema = z.object({
  tools: z.array(z.string()).optional(),
  toolsIntegrated: z.string().min(1, "Please select how your tools integrate"),
  automationHistory: z.string().min(1, "Please select your automation experience"),
});

// Card 4 — Where to Send Your Blueprint
const card4Schema = z.object({
  firstName: z.string().min(1, "Your first name is required"),
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().optional().or(z.literal("")),
});

export const blueprintSchema = card1Schema
  .merge(card2Schema)
  .merge(card3Schema)
  .merge(card4Schema);

export type BlueprintFormData = z.infer<typeof blueprintSchema>;
