import { z } from "zod";

// Card 1 — Your Business
const card1Schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(1, "Please describe what you do"),
  currentWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Card 2 — The Goal
const card2Schema = z.object({
  primaryGoal: z.string().min(1, "Please share your primary goal"),
  desiredFeelings: z.array(z.string()).min(1, "Select at least one feeling").max(3, "Select up to 3 feelings"),
  turnOffs: z.string().optional(),
});

// Card 3 — Look & Feel
const card3Schema = z.object({
  likedWebsites: z.string().min(1, "Please share at least one website you like"),
  styleWords: z.array(z.string()).min(1, "Select at least one style").max(4, "Select up to 4 styles"),
  avoid: z.string().optional(),
});

// Card 4 — Content & Assets
const card4Schema = z.object({
  neededPages: z.array(z.string()).min(1, "Select at least one page"),
  brandingStatus: z.string().min(1, "Please select your branding status"),
  photoStatus: z.string().min(1, "Please select your photo status"),
});

// Card 5 — Practicalities
const card5Schema = z.object({
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  additionalInfo: z.string().optional(),
});

// Card 6 — Contact Details
const card6Schema = z.object({
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export const startSchema = card1Schema
  .merge(card2Schema)
  .merge(card3Schema)
  .merge(card4Schema)
  .merge(card5Schema)
  .merge(card6Schema);

export type StartFormData = z.infer<typeof startSchema>;
