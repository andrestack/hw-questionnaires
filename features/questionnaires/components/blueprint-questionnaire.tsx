"use client";

import { QuestionnaireShell } from "./questionnaire-shell";
import { blueprintSchema } from "../lib/blueprint-schema";
import { submitBlueprint } from "../server/submit-blueprint";
import { type CardConfig } from "../lib/types";

const cards: CardConfig[] = [
  {
    title: "Your Business",
    fields: [
      {
        name: "businessType",
        label: "What type of business do you run?",
        type: "select",
        required: true,
        options: [
          "Trades (builder, plumber, electrician, painter, landscaper, etc.)",
          "Real estate",
          "Retail or hospitality",
          "Professional services (accountant, lawyer, consultant, etc.)",
          "Health or wellness",
          "Creative (photographer, designer, videographer, etc.)",
          "Other",
        ],
      },
      {
        name: "teamSize",
        label: "How many people in your team, including you?",
        type: "radio",
        required: true,
        options: ["Just me", "2–5", "6–20", "20+"],
      },
      {
        name: "biggestTimeDrain",
        label: "What's the single biggest thing eating your time right now?",
        type: "textarea",
        required: true,
        placeholder: "Don't overthink it — first thing that comes to mind",
      },
    ],
  },
  {
    title: "What You're Repeating",
    fields: [
      {
        name: "repeatedTasks",
        label: "Which of these do you do repeatedly every week?",
        type: "chips",
        required: true,
        options: [
          "Replying to the same enquiries",
          "Chasing quotes, invoices, or payments",
          "Scheduling, rescheduling, follow-ups",
          "Re-entering data across tools",
          "Writing the same emails or messages",
          "Preparing reports or summaries",
          "Managing bookings manually",
          "Something else",
        ],
      },
      {
        name: "weeklyAdminHours",
        label: "How many hours a week goes to admin and repetitive tasks?",
        type: "radio",
        required: true,
        options: ["Under 2 hours", "2–5 hours", "5–10 hours", "10–15 hours", "15+ hours (I feel this)"],
      },
      {
        name: "fiveHoursMeaning",
        label: "What would you do with 5 extra hours a week?",
        type: "textarea",
        required: true,
        placeholder: "Growth, sleep, family, another client — be honest",
      },
    ],
  },
  {
    title: "Your Tools",
    fields: [
      {
        name: "tools",
        label: "What tools do you currently use?",
        type: "chips",
        required: false,
        options: [
          "Gmail / Outlook",
          "Xero / MYOB / QuickBooks",
          "Tradify / ServiceM8 / simPRO",
          "HubSpot / another CRM",
          "Google Sheets / Excel",
          "Airtable",
          "Slack / Teams",
          "WhatsApp for business",
          "Nothing consistent — mostly manual",
        ],
      },
      {
        name: "toolsIntegrated",
        label: "Do your tools talk to each other?",
        type: "radio",
        required: true,
        options: ["Yes, mostly", "Some do, some don't", "No — I re-enter data constantly"],
      },
      {
        name: "automationHistory",
        label: "Have you tried to automate anything in your business?",
        type: "radio",
        required: true,
        options: ["Yes, and it works", "Tried but gave up", "Not yet"],
      },
    ],
  },
  {
    title: "Where to Send Your Blueprint",
    fields: [
      {
        name: "firstName",
        label: "First name",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "Your Blueprint will arrive here within a few minutes",
      },
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        required: false,
      },
    ],
  },
];

export function BlueprintQuestionnaire() {
  return (
    <QuestionnaireShell
      cards={cards}
      schema={blueprintSchema}
      onSubmit={submitBlueprint}
      confirmationMessage="Your Blueprint is being generated and will hit your inbox in the next few minutes. Check your spam if it doesn't show — it'll be worth finding."
    />
  );
}
