"use client";

import { QuestionnaireShell } from "./questionnaire-shell";
import { auditSchema } from "../lib/audit-schema";
import { submitAudit } from "../server/submit-audit";
import { type CardConfig } from "../lib/types";

const cards: CardConfig[] = [
  {
    title: "The Business",
    fields: [
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        required: true,
      },
      {
        name: "businessDescription",
        label: "What does the business do, and who do you serve?",
        type: "textarea",
        required: true,
        placeholder: "e.g. Pool shop and mobile service business. Residential and commercial clients on the Sunshine Coast.",
      },
      {
        name: "teamSize",
        label: "How many people work in the business, including you?",
        type: "select",
        required: true,
        options: ["Just me", "2–5", "6–15", "16–50", "50+"],
      },
    ],
  },
  {
    title: "How You Work",
    fields: [
      {
        name: "clientJourney",
        label: "Walk me through what happens from the moment a new client contacts you to when the job is done",
        type: "textarea",
        required: true,
        placeholder: "Don't worry about being perfect — describe it how it actually works",
      },
      {
        name: "timeSink",
        label: "Where do you spend the most time in your week that feels like it shouldn't take that long?",
        type: "textarea",
        required: true,
      },
      {
        name: "adminHours",
        label: "How many hours per week would you estimate goes to admin and repetitive tasks?",
        type: "radio",
        required: true,
        options: ["Under 2 hours", "2–5 hours", "5–10 hours", "10–15 hours", "15+ hours"],
      },
    ],
  },
  {
    title: "Your Tools",
    fields: [
      {
        name: "tools",
        label: "What do you currently use for each of the following?",
        type: "tool-group",
        required: true,
        toolFields: [
          { name: "clientCommunication", label: "Client communication / email" },
          { name: "proposalsQuotes", label: "Proposals and quotes" },
          { name: "invoicing", label: "Invoicing" },
          { name: "jobManagement", label: "Job or project management" },
          { name: "scheduling", label: "Scheduling / bookings" },
          { name: "fileStorage", label: "File storage" },
          { name: "otherTools", label: "Any other tools" },
        ],
      },
      {
        name: "toolFrustrations",
        label: "Do any of your tools frustrate you, or fail to talk to each other?",
        type: "textarea",
        required: false,
        placeholder: "e.g. I have to re-enter data in three different places every time a job is booked",
      },
      {
        name: "automationAttempts",
        label: "Have you tried to automate anything in the business already? If yes, what?",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "What's Broken",
    fields: [
      {
        name: "topFrustrations",
        label: "What are the top 3 things that frustrate you most about how the business runs right now?",
        type: "textarea",
        required: true,
        placeholder: "Number them if it helps",
      },
      {
        name: "fixOvernight",
        label: "If you could fix ONE thing overnight, what would it be?",
        type: "textarea",
        required: true,
      },
      {
        name: "repetitiveTasks",
        label: "What tasks do you repeat constantly that you wish just happened automatically?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Looking Forward",
    fields: [
      {
        name: "techComfort",
        label: "How comfortable are you with technology?",
        type: "radio",
        required: true,
        options: [
          "1 — I avoid it where I can",
          "2 — I use what I have to",
          "3 — Comfortable with everyday tools",
          "4 — I enjoy learning new tools",
          "5 — I love technology and adopt it early",
        ],
      },
      {
        name: "successOutcome",
        label: "What would a successful outcome from our session look like for you?",
        type: "textarea",
        required: true,
      },
      {
        name: "anythingElse",
        label: "Anything else you'd like me to know before we meet?",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "Your Details",
    fields: [
      {
        name: "fullName",
        label: "Full name",
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
        label: "Business phone",
        type: "text",
        required: false,
      },
    ],
  },
];

export function AuditQuestionnaire() {
  return (
    <QuestionnaireShell
      cards={cards}
      schema={auditSchema}
      onSubmit={submitAudit}
      confirmationMessage="I've got everything I need. I'll review this before we meet and come prepared. You'll receive a confirmation email shortly."
    />
  );
}
