# PRD — AIOS Pre-Audit Questionnaire

## Context

Before every AIOS audit session ($1,500), André needs the client to fill out a pre-audit form — sent 48 hours before the meeting. The goal: André walks in already knowing their operation, tools, pain points, and ambitions. This turns a 90-minute exploration into a 60-minute confirmation + action planning session.

The audit sells itself when André demonstrates he's already done his homework. This form is what makes that possible.

**First deployment:** Direct link sent to Paul (pool shop). Not on the Hinterland Web site yet — that comes later. Timeline: live before Paul returns from Canberra (~June 8, 2026).

**This form is not a lead qualifier.** AIOS leads are pre-qualified through personal outreach. The form is pure info-gathering — no budget filter, no branching logic, everyone gets the same confirmation.

---

## Question Set — 6 Cards × 3 Questions

Each card presents exactly 3 fields. Same card layout and CSS View Transitions approach as the website onboarding form.

### Card 1 — The Business
1. **Business name** — text, required
2. **What does the business do, and who do you serve?** — textarea, required (placeholder: "e.g. Pool shop and mobile service business. Residential and commercial clients on the Sunshine Coast.")
3. **How many people work in the business, including you?** — select (Just me / 2–5 / 6–15 / 16–50 / 50+), required

### Card 2 — How You Work
1. **Walk me through what happens from the moment a new client contacts you to when the job is done — list the steps as they actually happen today** — textarea, required (placeholder: "Don't worry about being perfect — describe it how it actually works")
2. **Where do you spend the most time in your week that feels like it shouldn't take that long?** — textarea, required
3. **How many hours per week would you estimate goes to admin and repetitive tasks?** — radio (Under 2 hours / 2–5 hours / 5–10 hours / 10–15 hours / 15+ hours), required

### Card 3 — Your Tools
1. **What do you currently use for each of the following?** — structured input group, required where applicable:
   - Client communication / email
   - Proposals and quotes
   - Invoicing
   - Job or project management
   - Scheduling / bookings
   - File storage
   - Any other tools
2. **Do any of your tools frustrate you, or fail to talk to each other?** — textarea, optional (placeholder: "e.g. I have to re-enter data in three different places every time a job is booked")
3. **Have you tried to automate anything in the business already? If yes, what?** — textarea, optional

### Card 4 — What's Broken
1. **What are the top 3 things that frustrate you most about how the business runs right now?** — textarea, required (placeholder: "Number them if it helps")
2. **If you could fix ONE thing overnight, what would it be?** — textarea, required
3. **What tasks do you repeat constantly that you wish just happened automatically?** — textarea, required

### Card 5 — Looking Forward
1. **How comfortable are you with technology?** — radio scale, required
   - 1 — I avoid it where I can
   - 2 — I use what I have to
   - 3 — Comfortable with everyday tools
   - 4 — I enjoy learning new tools
   - 5 — I love technology and adopt it early
2. **What would a successful outcome from our session look like for you?** — textarea, required
3. **Anything else you'd like me to know before we meet?** — textarea, optional

### Card 6 — Your Details
1. **Full name** — text, required
2. **Email address** — email, required
3. **Business phone** — text, optional

→ **Submit** → Confirmation screen

---

## Confirmation Screen

> "Thanks [name] — I've got everything I need.
> I'll review this before we meet and come prepared.
> You'll receive a confirmation email shortly."

No redirect. Subtle success state on the same page.

---

## Data Flow

```
Client fills form
       ↓
Next.js Server Action
       ↓
Promise.all([
  POST → SheetSandbox API  →  appends row to Google Sheet (AIOS Audits tab)
  POST → n8n webhook        →  email to André + auto-reply to client
])
       ↓
Success → confirmation screen
Error   → inline error, allow retry without losing form state
```

**Google Sheet tab:** "AIOS Pre-Audit Submissions" (separate tab from website enquiries, or a separate sheet entirely)

**n8n webhook triggers:**
- Email to `andre@hinterlandweb.com` — all answers formatted as a clean brief, structured for quick pre-meeting review
- Auto-reply to client — confirms receipt, sets expectation, André's contact details

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Forms | React Hook Form + Zod |
| Transitions | CSS View Transitions API (`document.startViewTransition`) |
| Submission | Next.js Server Action |
| Storage | SheetSandbox → Google Sheet |
| Notifications | n8n webhook |
| Deployment | Vercel |
| Initial URL | Direct link (no subdomain yet — deploy to Vercel default URL for Paul) |
| Future URL | `audit.hinterlandweb.com` or `/start/aios` on own site |

**Use the React/Next.js solid principles skill** when implementing.

---

## UX Behaviour

- **Progress**: "Step 2 of 6" or 6 dots at top — same pattern as website onboarding form
- **Transitions**: Slide left on Next, slide right on Back via `document.startViewTransition()`
- **Validation**: Per-card Zod schema, validated on Next button press (not on blur)
- **Back button**: Available from Card 2 onwards, preserves all state
- **Required vs optional**: Optionals labeled "(optional)" — no asterisks
- **Card 3 tool list**: Rendered as a group of labeled text inputs (not a single textarea) — one input per tool category, all optional except "Client communication / email"
- **Mobile-first**: Generous tap targets, textarea heights that don't feel cramped

---

## Qualification Logic

None. This form is sent to pre-qualified leads only (personal outreach, warm referrals). All submissions get the same confirmation and auto-reply. André reviews and decides next steps.

---

## Auto-Reply Email (to client)

**Subject:** Got your brief — I'll come prepared

> Hi [name],
>
> Thanks for taking the time to fill that out — I know it's not nothing.
>
> I'll read through your answers before we meet and come with specific questions and ideas rather than starting from scratch. That's the point of this — our time together will be more useful because of it.
>
> If anything changes or you want to add something, just reply to this email.
>
> See you soon,
> André
> Hinterland Web
> andre@hinterlandweb.com

---

## Email to André

**Subject:** AIOS pre-audit brief — [name], [business name]

Formatted as a clean brief André can skim in 5 minutes before the meeting:

```
BUSINESS
Name: [business name]
What they do: [answer]
Team size: [answer]

HOW THEY WORK
Client journey: [answer]
Biggest time sink: [answer]
Weekly admin hours: [answer]

TOOLS
Email/comms: [answer]
Quotes/proposals: [answer]
Invoicing: [answer]
Job management: [answer]
Scheduling: [answer]
File storage: [answer]
Other: [answer]
Tool frustrations: [answer]
Already automated: [answer]

WHAT'S BROKEN
Top 3 frustrations: [answer]
Fix one thing overnight: [answer]
Repetitive tasks: [answer]

LOOKING FORWARD
Tech comfort: [1–5] — [label]
Success looks like: [answer]
Anything else: [answer]

CONTACT
Name: [name]
Email: [email] — [mailto link: Reply to [name]]
Phone: [phone]
```

---

## Files to Create

Reuse the same Next.js project as the website onboarding form (monorepo or separate `/apps/aios-audit` package). New route or separate deployment.

```
/apps/aios-audit/          (or /apps/onboarding/app/aios/ as a new route)
  app/
    page.tsx               # Multi-step form shell — same structure as website form
    actions.ts             # Server Action: submit-aios-audit
    layout.tsx             # Minimal layout, no nav
  lib/
    schema.ts              # Zod schemas per card (different from website form)
```

Shared components (ChipSelect, RadioGroup, Card, StepIndicator, sheetsandbox.ts, notify.ts) reused from the website onboarding app.

---

## Environment Variables

Same as website form — reuse existing `.env.local`:

```
SHEETSANDBOX_TOKEN=        # Same token, different sheet tab
N8N_WEBHOOK_URL_AIOS=      # Separate n8n webhook for AIOS audit emails
```

---

## Verification

1. Fill form end-to-end — all 6 cards transition correctly
2. Submit → row appears in Google Sheet "AIOS Pre-Audit Submissions" tab with all fields
3. Submit → André receives clean pre-meeting brief email
4. Submit → client receives auto-reply to their entered email
5. Required fields missing → Zod validation blocks Next button
6. Card 3 tool inputs → each category captured as separate column in Sheet
7. Test on mobile (375px) — textarea heights usable, tool input group scrollable

---

## Parked / Out of Scope

- **AIOS Pre-Audit form on own website**: First deployment is a direct Vercel link for Paul. Add to `hinterlandweb.com` after own site rebuild.
- **Website Enquiry Form PRD**: Separate document — `2026-05-19-prd-website-onboarding-questionnaire.md`
