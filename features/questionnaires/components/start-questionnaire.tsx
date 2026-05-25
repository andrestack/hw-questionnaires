"use client";

import { QuestionnaireShell } from "./questionnaire-shell";
import { startSchema } from "../lib/start-schema";
import { submitStart } from "../server/submit-start";
import { type CardConfig } from "../lib/types";

const cards: CardConfig[] = [
  {
    title: "Your Business",
    fields: [
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        required: true,
      },
      {
        name: "businessDescription",
        label: "What do you do and who do you serve?",
        type: "textarea",
        required: true,
        placeholder: "e.g. I'm a painter in Brisbane working with homeowners on high-end interior work",
      },
      {
        name: "currentWebsite",
        label: "Current website URL",
        type: "url",
        required: false,
        placeholder: "Leave blank if you don't have one yet",
      },
    ],
  },
  {
    title: "The Goal",
    fields: [
      {
        name: "primaryGoal",
        label: "What's the #1 thing you want your new website to achieve?",
        type: "textarea",
        required: true,
      },
      {
        name: "desiredFeelings",
        label: "When someone lands on your site, what should they feel?",
        type: "chips",
        required: true,
        options: ["Calm", "Trusted", "Impressed", "Excited", "Premium", "Approachable", "Professional", "Inspired"],
        maxSelections: 3,
      },
      {
        name: "turnOffs",
        label: "What would make a visitor click away without contacting you?",
        type: "textarea",
        required: false,
        placeholder: "e.g. looks cheap, too salesy, hard to navigate",
      },
    ],
  },
  {
    title: "Look & Feel",
    fields: [
      {
        name: "likedWebsites",
        label: "Share 1–3 websites you like — include what you like about each",
        type: "textarea",
        required: true,
        placeholder: "e.g. apple.com — clean, confident, lots of space",
      },
      {
        name: "styleWords",
        label: "Which words describe your ideal site feel?",
        type: "chips",
        required: true,
        options: ["Minimal", "Bold", "Warm", "Modern", "Traditional", "Playful", "Premium", "Earthy", "Clean", "Creative"],
        maxSelections: 4,
      },
      {
        name: "avoid",
        label: "Anything you definitely want to avoid?",
        type: "textarea",
        required: false,
        placeholder: "colours, styles, feelings — anything that would feel wrong",
      },
    ],
  },
  {
    title: "Content & Assets",
    fields: [
      {
        name: "neededPages",
        label: "Which pages do you need?",
        type: "chips",
        required: true,
        options: ["Home", "About", "Services", "Portfolio", "Blog", "Pricing", "Testimonials", "Booking", "FAQ", "Contact", "Other"],
      },
      {
        name: "brandingStatus",
        label: "Branding status",
        type: "radio",
        required: true,
        options: ["Logo + brand guidelines ready", "Logo only, no guidelines", "Starting from scratch"],
      },
      {
        name: "photoStatus",
        label: "Photos & imagery",
        type: "radio",
        required: true,
        options: ["Professional photos ready", "I need photography", "Mix of both", "I'll use stock images"],
      },
    ],
  },
  {
    title: "Practicalities",
    fields: [
      {
        name: "budget",
        label: "Rough budget range",
        type: "radio",
        required: true,
        options: ["Under $3,000", "$3,000–$5,000", "$5,000–$8,000", "$8,000+", "Not sure yet"],
      },
      {
        name: "timeline",
        label: "Ideal launch window",
        type: "radio",
        required: true,
        options: ["ASAP (4–6 weeks)", "2–3 months", "3–6 months", "No rush"],
      },
      {
        name: "additionalInfo",
        label: "Anything else we should know before we talk?",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "Contact Details",
    fields: [
      {
        name: "name",
        label: "Your name",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
      },
      {
        name: "phone",
        label: "Phone number",
        type: "text",
        required: false,
      },
    ],
  },
];

export function StartQuestionnaire() {
  return (
    <QuestionnaireShell
      cards={cards}
      schema={startSchema}
      onSubmit={submitStart}
      confirmationMessage="Brief received. I'll review it and be in touch within 1 business day. You'll get a confirmation email shortly."
    />
  );
}
