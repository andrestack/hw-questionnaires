import { z } from "zod";

// Card 1 — The Business
const card1Schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(1, "Please describe your business"),
  teamSize: z.string().min(1, "Please select your team size"),
});

// Card 2 — How You Work
const card2Schema = z.object({
  clientJourney: z.string().min(1, "Please describe your client journey"),
  timeSink: z.string().min(1, "Please share your biggest time sink"),
  adminHours: z.string().min(1, "Please select admin hours"),
});

// Card 3 — Your Tools
const card3Schema = z.object({
  clientCommunication: z.string().min(1, "Please share your communication tool"),
  proposalsQuotes: z.string().optional().or(z.literal("")),
  invoicing: z.string().optional().or(z.literal("")),
  jobManagement: z.string().optional().or(z.literal("")),
  scheduling: z.string().optional().or(z.literal("")),
  fileStorage: z.string().optional().or(z.literal("")),
  otherTools: z.string().optional().or(z.literal("")),
  toolFrustrations: z.string().optional(),
  automationAttempts: z.string().optional(),
});

// Card 4 — What's Broken
const card4Schema = z.object({
  topFrustrations: z.string().min(1, "Please share your top frustrations"),
  fixOvernight: z.string().min(1, "Please share what you'd fix"),
  repetitiveTasks: z.string().min(1, "Please share repetitive tasks"),
});

// Card 5 — Looking Forward
const card5Schema = z.object({
  techComfort: z.string().min(1, "Please rate your tech comfort"),
  successOutcome: z.string().min(1, "Please share your desired outcome"),
  anythingElse: z.string().optional(),
});

// Card 6 — Your Details
const card6Schema = z.object({
  fullName: z.string().min(1, "Your full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export const auditSchema = card1Schema
  .merge(card2Schema)
  .merge(card3Schema)
  .merge(card4Schema)
  .merge(card5Schema)
  .merge(card6Schema);

export type AuditFormData = z.infer<typeof auditSchema>;
