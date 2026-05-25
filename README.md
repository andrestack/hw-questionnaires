# Hinterland Web — Questionnaires

Multi-step client onboarding questionnaires for Hinterland Web. Two forms, one codebase, shared design system.

**Live URLs:**
- `start.hinterlandweb.com` — Website Design Onboarding
- `audit.hinterlandweb.com` — AIOS Pre-Audit

---

## What This Is

This repo houses two client-facing questionnaires that collect structured information before discovery calls:

1. **Website Onboarding** — For website design leads. Captures business context, visual direction, content needs, budget, and timeline.
2. **AIOS Pre-Audit** — For AIOS audit clients. Maps business operations, tools, pain points, and automation opportunities.

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
│       │   └── audit-questionnaire.tsx   # AIOS form config
│       ├── lib/
│       │   ├── types.ts          # Shared TypeScript types
│       │   ├── start-schema.ts   # Zod schema (website)
│       │   └── audit-schema.ts   # Zod schema (AIOS)
│       └── server/
│           ├── submit-start.ts   # Server action → Sheet + n8n
│           └── submit-audit.ts   # Server action → Sheet + n8n
├── lib/                          # Global utilities
│   ├── utils.ts                  # cn() helper
│   ├── sheetsandbox.ts           # SheetSandbox API client
│   └── notify.ts                 # n8n webhook client
├── middleware.ts                 # Subdomain → route rewriting
├── docs/                         # PRDs and specifications
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
Promise.all([
  POST → SheetSandbox → Google Sheet tab
  POST → n8n webhook → emails (André + client auto-reply)
])
       ↓
Confirmation screen (no redirect)
```

**Error Handling**
- SheetSandbox failure → inline error, allow retry, form state preserved
- Webhook failure → logged but submission succeeds (don't lose data)
- Validation failure → blocks "Next" button, shows field-level errors

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
| Data Storage | SheetSandbox → Google Sheets |
| Notifications | n8n webhooks |
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
SHEETSANDBOX_TOKEN=        # From sheetsandbox.com dashboard
N8N_WEBHOOK_URL=           # n8n webhook for website form
N8N_WEBHOOK_URL_AIOS=      # n8n webhook for AIOS audit form
```

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

Create one Google Sheet with two tabs:

**Tab: `Website`**
```
businessName, businessDescription, currentWebsite, primaryGoal, desiredFeelings, turnOffs, likedWebsites, styleWords, avoid, neededPages, brandingStatus, photoStatus, budget, timeline, additionalInfo, name, email, phone, submittedAt
```

**Tab: `AIOS`**
```
businessName, businessDescription, teamSize, clientJourney, timeSink, adminHours, clientCommunication, proposalsQuotes, invoicing, jobManagement, scheduling, fileStorage, otherTools, toolFrustrations, automationAttempts, topFrustrations, fixOvernight, repetitiveTasks, techComfort, successOutcome, anythingElse, fullName, email, phone, submittedAt
```

---

## Deployment

1. Push to GitHub (`main` branch)
2. Import repo in Vercel dashboard
3. Add environment variables
4. Configure custom domains:
   - `start.hinterlandweb.com`
   - `audit.hinterlandweb.com`
5. Deploy

---

## Documentation

- [AGENTS.md](./AGENTS.md) — Coding rules and conventions for AI agents
- [DESIGN.md](./DESIGN.md) — Visual design system (colors, typography, blobs)
- [docs/](./docs/) — PRDs for both questionnaires
- [reference/](./reference/) — Cross-project reference (brand guidelines, tech stack, ICPs)

---

## Verification Checklist

- [ ] All 6 cards transition correctly
- [ ] Validation blocks on missing required fields
- [ ] Back button preserves state
- [ ] Submit → row appears in correct Google Sheet tab
- [ ] Submit → André receives formatted email
- [ ] Submit → client receives auto-reply
- [ ] Mobile usability (375px width)
- [ ] Subdomain routing works in production
