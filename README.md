# Hinterland Web — Questionnaires

Multi-step client onboarding questionnaires for Hinterland Web. Three forms, one codebase, shared design system.

**Live URLs:**
- `forms.hinterlandweb.com/start` — Website Design Onboarding
- `forms.hinterlandweb.com/audit` — AIOS Pre-Audit
- `forms.hinterlandweb.com/blueprint` — Automation Blueprint Lead Magnet


---

## What This Is

This repo houses three client-facing questionnaires that collect structured information before discovery calls:

1. **Website Onboarding** — For website design leads. Captures business context, visual direction, content needs, budget, and timeline.
2. **AIOS Pre-Audit** — For AIOS audit clients. Maps business operations, tools, pain points, and automation opportunities.
3. **Automation Blueprint** — Lead magnet that generates personalized AI automation recommendations.

Both forms share identical UI patterns (6 cards × 3 questions, CSS View Transitions, step indicator) but collect different data. Results write to separate tabs in a shared Google Sheet.

---

## Architecture

### Feature-Based Folder Structure

```
hw-questionnaires/
├── app/                          # Next.js App Router (entry points only)
│   ├── (questionnaires)/         # Route group — shared questionnaire shell
│   │   ├── layout.tsx            # Minimal layout (no nav, blobs, centered)
│   │   ├── start/
│   │   │   └── page.tsx          # Website onboarding route
│   │   └── audit/
│   │       └── page.tsx          # AIOS audit route
│   ├── blueprint/                 # Blueprint questionnaire (light mode)
│   │   ├── page.tsx              # Lead magnet route
│   │   └── layout.tsx            # Light mode layout
│   ├── layout.tsx                # Root layout (Raleway font, metadata)
│   ├── page.tsx                  # Root landing (private link portal)
│   └── globals.css               # Brand colors, dark mode, blob utilities
├── features/
│   └── questionnaires/           # Domain-specific logic
│       ├── components/           # Shared UI components
│       │   ├── questionnaire-shell.tsx   # View transitions + navigation
│       │   ├── card.tsx                  # Card wrapper
│       │   ├── step-indicator.tsx        # Progress dots
│       │   ├── chip-select.tsx           # Multi-select chips
│       │   ├── radio-group.tsx           # Styled radios
│       │   ├── text-field.tsx            # Text input
│       │   ├── textarea-field.tsx        # Textarea
│       │   ├── confirmation-screen.tsx   # Success state
│       │   ├── start-questionnaire.tsx   # Website form config
│       │   ├── audit-questionnaire.tsx   # AIOS form config
│       │   └── blueprint-questionnaire.tsx # Blueprint form config
│       ├── lib/
│       │   ├── types.ts          # Shared TypeScript types
│       │   ├── start-schema.ts   # Zod schema (website)
│       │   ├── audit-schema.ts   # Zod schema (AIOS)
│       │   └── blueprint-schema.ts # Zod schema (blueprint)
│       └── server/
│           ├── submit-start.ts   # Server action → n8n webhook
│           ├── submit-audit.ts   # Server action → n8n webhook
│           └── submit-blueprint.ts # Server action → n8n webhook
├── lib/                          # Global utilities
│   ├── utils.ts                  # cn() helper
│   └── webhook.ts                # Webhook client
├── middleware.ts                 # Subdomain → route rewriting
├── docs/                         # PRDs and specifications
├── n8n-workflow-website.json     # n8n workflow for website form
├── n8n-workflow-aios.json        # n8n workflow for AIOS form
├── n8n-workflow-blueprint.json   # n8n workflow for Blueprint form
├── N8N_SETUP.md                  # n8n setup instructions
├── reference/                    # Cross-project reference (brand, stack, ICPs)
├── AGENTS.md                     # AI coding agent instructions
└── DESIGN.md                     # Visual design system
```

### Key Architectural Decisions

**Single Repo, Multiple Subdomains**
- One Next.js app serves both questionnaires
- `middleware.ts` rewrites `start.hinterlandweb.com` → `/start` and `audit.hinterlandweb.com` → `/audit`
- Shared components mean design changes apply to both forms instantly

**Server Components by Default**
- Page components (`page.tsx`) are Server Components
- Form logic lives in Client Components (`questionnaire-shell.tsx`, `*-questionnaire.tsx`)
- Data submission happens via Server Actions — no API routes needed

**Schema-First Forms**
- Each questionnaire has a Zod schema defining all fields across 6 cards
- Per-card validation triggered on "Next" button (not on blur)
- React Hook Form with `zodResolver` — no manual state management

**Submission Flow**
```
Client fills form
       ↓
React Hook Form validates (Zod)
       ↓
Server Action
       ↓
POST → n8n webhook
       ↓
n8n Workflow:
  1. Process/parse form data
  2. Call Claude API (Blueprint only)
  3. Append row to Google Sheet
  4. Send emails (André + client auto-reply)
       ↓
Confirmation screen (no redirect)
```

**Error Handling**
- Webhook failure → inline error, allow retry, form state preserved
- Validation failure → blocks "Next" button, shows field-level errors
- n8n handles Google Sheet write and email failures internally

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Components | Custom (no shadcn/ui for forms — custom design) |
| Transitions | CSS View Transitions API |
| Data Storage | n8n → Google Sheets |
| Orchestration | n8n webhooks |
| Hosting | Vercel |
| Font | Raleway (Google Fonts) |

---

## Design System

**Colors:**
- Primary: `#42B3E8` (sky blue) — CTAs, highlights
- Secondary: `#143144` (dark navy) — text on light
- Tertiary: `#D8E5CF` (sage green) — backgrounds

**Theme:**
- Light mode: sage green background, navy text
- Dark mode: navy background, sage green text
- Primary blue constant in both modes

**Blobs:** CSS `div` elements (absolute, blurred, semi-transparent) creating ambient glow

See [DESIGN.md](./DESIGN.md) for full specifications.

---

## Environment Variables

Create `.env.local`:

```
N8N_WEBHOOK_URL=           # n8n webhook for website form
N8N_WEBHOOK_URL_AIOS=      # n8n webhook for AIOS audit form
N8N_WEBHOOK_URL_BLUEPRINT= # n8n webhook for Blueprint form
```

See [N8N_SETUP.md](./N8N_SETUP.md) for complete setup instructions.

---

## Running Locally

```bash
npm install
npm run dev
```

Visit:
- `http://localhost:3000/start` — Website onboarding
- `http://localhost:3000/audit` — AIOS audit
- `http://localhost:3000` — Root landing

---

## Google Sheet Setup

Create one Google Sheet with **3 tabs**:

**Tab: `Website`**
```
submittedAt, businessName, businessDescription, currentWebsite, primaryGoal, desiredFeelings, turnOffs, likedWebsites, styleWords, avoid, neededPages, brandingStatus, photoStatus, budget, timeline, additionalInfo, name, email, phone, qualificationTag
```

**Tab: `AIOS`**
```
submittedAt, businessName, businessDescription, teamSize, clientJourney, timeSink, adminHours, clientCommunication, proposalsQuotes, invoicing, jobManagement, scheduling, fileStorage, otherTools, toolFrustrations, automationAttempts, topFrustrations, fixOvernight, repetitiveTasks, techComfort, successOutcome, anythingElse, fullName, email, phone
```

**Tab: `Leads`** (for Blueprint)
```
submittedAt, businessType, teamSize, biggestTimeDrain, repeatedTasks, weeklyAdminHours, fiveHoursMeaning, tools, toolsIntegrated, automationHistory, firstName, email, businessName, blueprintSentAt, automation1_name, automation1_description, automation1_hoursSaved, automation1_complexity, automation2_name, automation2_description, automation2_hoursSaved, automation2_complexity, automation3_name, automation3_description, automation3_hoursSaved, automation3_complexity, quickWin, highIntentTag
```

Data is written to Google Sheets via n8n workflows, not directly from Next.js.

---

## Deployment

1. Push to GitHub (`main` branch)
2. Import repo in Vercel dashboard
3. Add environment variables (see `.env.example`)
4. Configure custom domains:
   - `start.hinterlandweb.com`
   - `audit.hinterlandweb.com`
   - `blueprint.hinterlandweb.com`
5. Set up n8n workflows (see [N8N_SETUP.md](./N8N_SETUP.md))
6. Deploy

---

## Documentation

- [AGENTS.md](./AGENTS.md) — Coding rules and conventions for AI agents
- [DESIGN.md](./DESIGN.md) — Visual design system (colors, typography, blobs)
- [N8N_SETUP.md](./N8N_SETUP.md) — n8n webhook configuration guide
- [docs/](./docs/) — PRDs for all questionnaires
- [reference/](./reference/) — Cross-project reference (brand guidelines, tech stack, ICPs)

---

## Verification Checklist

- [ ] All cards transition correctly (6 for Start/Audit, 4 for Blueprint)
- [ ] Validation blocks on missing required fields
- [ ] Back button preserves state
- [ ] Submit → row appears in correct Google Sheet tab
- [ ] Submit → André receives formatted email
- [ ] Submit → client receives auto-reply (or Blueprint for lead magnet)
- [ ] Blueprint → Claude AI generates personalized recommendations
- [ ] Mobile usability (375px width)
- [ ] Subdomain routing works in production
