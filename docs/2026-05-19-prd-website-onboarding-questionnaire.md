# PRD — Website Design Onboarding Questionnaire

## Context

André needs a polished, multi-step onboarding form that website enquiry leads fill out before any discovery call. The goal is for André to walk into every sales conversation already knowing the client's business, visual direction, budget, and content situation — turning a 90-minute exploration into a 60-minute confirmation + scoping session.

This is a **standalone Next.js app** deployed at `start.hinterlandweb.com` (or `brief.hinterlandweb.com` — confirm before DNS setup). It links from the main Hinterland Web Astro site. Built now, integrated into the site rebuild later.

---

## Question Set — 6 Cards × 3 Questions

Each card presents exactly 3 fields. Smooth CSS View Transition between cards. Progress indicator at top (dots or step count).

### Card 1 — Your Business
1. **Business name** — text input, required
2. **What do you do and who do you serve?** — textarea, required (placeholder: "e.g. I'm a painter in Brisbane working with homeowners on high-end interior work")
3. **Current website URL** — url input, optional (placeholder: "Leave blank if you don't have one yet")

### Card 2 — The Goal
1. **What's the #1 thing you want your new website to achieve?** — textarea, required
2. **When someone lands on your site, what should they feel?** — multi-select chips (Calm / Trusted / Impressed / Excited / Premium / Approachable / Professional / Inspired — pick up to 3)
3. **What would make a visitor click away without contacting you?** — textarea, optional (placeholder: "e.g. looks cheap, too salesy, hard to navigate")

### Card 3 — Look & Feel
1. **Share 1–3 websites you like — include what you like about each** — textarea, required (placeholder: "e.g. apple.com — clean, confident, lots of space")
2. **Which words describe your ideal site feel?** — multi-select chips (Minimal / Bold / Warm / Modern / Traditional / Playful / Premium / Earthy / Clean / Creative — pick up to 4)
3. **Anything you definitely want to avoid?** — textarea, optional (placeholder: "colours, styles, feelings — anything that would feel wrong")

### Card 4 — Content & Assets
1. **Which pages do you need?** — multi-select chips (Home / About / Services / Portfolio / Blog / Pricing / Testimonials / Booking / FAQ / Contact / Other)
2. **Branding status** — radio (Logo + brand guidelines ready / Logo only, no guidelines / Starting from scratch)
3. **Photos & imagery** — radio (Professional photos ready / I need photography / Mix of both / I'll use stock images)

### Card 5 — Practicalities
1. **Rough budget range** — radio (Under $3,000 / $3,000–$5,000 / $5,000–$8,000 / $8,000+ / Not sure yet)
2. **Ideal launch window** — radio (ASAP (4–6 weeks) / 2–3 months / 3–6 months / No rush)
3. **Anything else we should know before we talk?** — textarea, optional

### Card 6 — Contact Details (final commitment step)
1. **Your name** — text, required
2. **Email address** — email, required
3. **Phone number** — text, optional

→ **Submit** button → Confirmation screen

---

## Confirmation Screen

> "Thanks [name] — brief received.  
> I'll review it and be in touch within 1 business day.  
> You'll get a confirmation email shortly."

No redirect. Stay on page. Animated tick or subtle success state.

---

## Data Flow

```
Client fills form
       ↓
Next.js Server Action (POST /api/submit-brief)
       ↓
Promise.all([
  POST → SheetSandbox API  →  appends row to Google Sheet
  POST → n8n webhook        →  email to André + auto-reply to client
])
       ↓
Success → show confirmation screen
Error   → show inline error, allow retry (do not lose form state)
```

**SheetSandbox** (https://sheetsandbox.com/docs):
- Turns a Google Sheet into a REST API
- POST appends a new row
- API token stored as `SHEETSANDBOX_TOKEN` env var — server-side only, never client-exposed
- Sheet columns map 1:1 to field names

**n8n webhook** triggers:
- Email to `andre@hinterlandweb.com` — all fields formatted cleanly, one-click reply link
- Auto-reply to client email — confirms receipt, sets expectation (1 business day), André's contact info

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
| Subdomain | `start.hinterlandweb.com` (DNS CNAME → Vercel) |

**Use the React/Next.js solid principles skill** when implementing — user has a dedicated skill for this that should be applied to every project.

---

## UX Behaviour

- **Progress**: Step indicator at top (e.g. "Step 2 of 6" or 6 dots)
- **Transitions**: `document.startViewTransition()` wrapping card state change — slide left on Next, slide right on Back
- **Validation**: Zod schema per card — validate on Next button press, not on blur (less aggressive UX)
- **Back button**: Always available from Card 2 onwards, preserves form state
- **Required vs optional**: All optionals labeled "(optional)" — no asterisks
- **Mobile-first**: Cards feel native on mobile, generous tap targets
- **No autosave**: Form state held in React Hook Form's `watch` — lost on refresh (acceptable for this form length)

---

## Qualification Logic

Budget-based filtering is handled in the **n8n webhook** (not in the form itself — the form always submits successfully and shows the same confirmation screen).

| Budget selected | n8n action |
|----------------|-----------|
| Under $3,000 | Send "not the right fit" auto-reply to client (see below). Tag row in Google Sheet as `low-budget`. Email André with `[LOW BUDGET]` prefix in subject. |
| $3,000–$5,000 / $5,000–$8,000 / $8,000+ / Not sure yet | Send standard auto-reply. Normal email to André. |

**Why in n8n, not the form:** The form UX stays clean — no conditional screens mid-flow. The client always sees the same confirmation. André sees the flag in his email and can decide whether to follow up.

**Low-budget auto-reply subject:** Your Hinterland Web enquiry

> Hi [name],
>
> Thanks for filling out the brief — I appreciate you sharing the detail.
>
> Based on your budget, I'm not the right fit right now. My projects start at $3,000, which covers the custom build, the agent integration, and the first month of support. Below that, the work I do isn't possible to deliver properly.
>
> That said, if your budget is flexible or you're open to a different scope, feel free to reply and we can have a quick chat.
>
> Thanks again,  
> André  
> Hinterland Web

---

## Auto-Reply Email (to client — standard)

**Subject:** Got your brief — I'll be in touch soon

> Hi [name],
>
> Thanks for taking the time to fill that out — it genuinely helps.
>
> I've received your brief for [business name] and will review it within 1 business day. If anything's urgent, you can reach me directly at andre@hinterlandweb.com.
>
> Talk soon,  
> André  
> Hinterland Web

---

## Email to André

**Subject:** New website brief — [business name]  
*(Prefix `[LOW BUDGET]` if budget === "Under $3,000")*

Formatted list of all fields. Final line: mailto link pre-filled with client's email and subject "Re: Your website brief".

---

## Files to Create

```
/apps/onboarding/          (new Next.js project — or monorepo package)
  app/
    page.tsx               # Multi-step form shell, view transition logic
    actions.ts             # Server Action: submit-brief
    layout.tsx             # Minimal layout, no nav
  components/
    Card.tsx               # Single card wrapper with transition animation
    StepIndicator.tsx      # Dot/step progress at top
    fields/
      ChipSelect.tsx       # Multi-select chip component
      RadioGroup.tsx       # Styled radio buttons
  lib/
    schema.ts              # Zod schemas per card + full schema
    sheetsandbox.ts        # POST helper for SheetSandbox API
    notify.ts              # POST to n8n webhook
  .env.local               # SHEETSANDBOX_TOKEN, N8N_WEBHOOK_URL
```

---

## Environment Variables Required

```
SHEETSANDBOX_TOKEN=        # SheetSandbox API token (from sheetsandbox.com dashboard)
N8N_WEBHOOK_URL=           # n8n webhook URL (create new webhook workflow)
```

---

## Verification

1. Fill form end-to-end in dev — confirm all 6 cards transition correctly
2. Submit → confirm row appears in Google Sheet with all fields
3. Submit → confirm André receives formatted email
4. Submit → confirm client receives auto-reply to the email entered
5. Submit with budget "Under $3,000" → confirm low-budget auto-reply sent + `[LOW BUDGET]` tag in André's email
6. Submit with intentionally missing required fields → confirm Zod validation blocks progression
7. Test on mobile (375px width) — confirm all chips, radios, textareas are usable
8. Simulate n8n webhook failure → confirm error state shows without data loss

---

## Parked / Out of Scope

- **"Follow" skill**: User mentioned a separate software product to build a skill for. Awaiting link — separate task, not part of this PRD.
- **AIOS Pre-Audit Questionnaire**: Separate PRD, separate form — same tech approach.
