# Default Tech Stack — Hinterland Web

*These are the go-to decisions for every project. Don't reinvent without a reason.*

---

## Website Projects

### When to use Next.js
- Complex sites with app-like features (user authentication, dashboards, dynamic data)
- Notion as CMS (API-connected, requires server-side rendering)
- Sites with a lot of interactivity
- Clients who need more than a brochure site

### When to use Astro
- Marketing and content sites (speed is the priority)
- Blog-heavy or content-heavy sites
- Sites where SEO is critical (Astro renders faster, cleaner HTML)
- Simple portfolio/brochure sites

### Standard Stack (Next.js projects)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode — no `any`)
- **CMS:** Payload for Content heavy website, otherwise as plain content collections in Astro websites
- **Image storage:** Cloudflare R2 (bypass Notion's 24hr image URL expiry)
- **Email:** N8N webhook → email forwarding (not Resend — domain verification issues)
- **Component library:** shadcn/ui
- **Styling utilities:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Design starting point:** Super Design (initial component structure)
- **Coding agent:** Kimi Moonshot 2.6 via Opencode
- **Hosting:** Vercel (default) or Cloudflare Pages
- **Forms:** React Hook Form + Zod (schema-first, with `zodResolver`)
- **Data fetching:** Server Components / Server Actions (primary) → TanStack Query (client polling/hydration)
- **State management hierarchy:** URL Search Params → TanStack Query (server state) → Zustand (global client) → Context (static/low-frequency only)

### Standard Stack (Astro projects)
- **Framework:** Astro
- **Content:** Markdown files in project root OR Notion API
- **Styling:** Tailwind CSS
- **Coding agent:** Kimi Moonshot 2.6
- **Hosting:** Cloudflare Pages

---

## Automation Projects

- **Primary tool:** N8N (self-hosted or cloud)
- **Trigger:** Webhooks (form submissions, Notion changes, scheduled)
- **Data processing:** Python scripts when heavy lifting needed
- **PDF extraction:** pdfminer or similar (Greenhouse Form 6 use case)
- **CRM integration:** Airtable API (Greenhouse project)

---

## AIOS Projects

- **Brain:** Claude Code + AGENTS.md
- **Context:** Structured context/ folder (this system)
- **Skills:** Cowork skills bundle
- **Automation layer:** N8N (connects the AI actions to real-world tools)
- **Meeting transcripts:** Granola or Fathom (future)
- **Daily delivery:** Telegram bot (future — for morning brief)

---

## Decisions Log (What We've Tried and Why)

| Decision | Why |
|----------|-----|
| Cloudflare R2 over Notion native images | Notion image URLs expire every 24 hours — R2 gives permanent URLs |
| N8N over Zapier | More flexible, self-hostable, better for complex automation chains |
| Notion over Payload CMS | Easier for non-technical clients to manage content. Payload is better for code-first setups. |
| Kimi Moonshot 2.6 over GPT-4 for coding | Better at following long context, handles component-level Next.js well |
| Next.js over Wix/WordPress | Custom code = client can update via chat interface. That IS the product. |
| Astro over Next.js for content sites | Speed + SEO. Renders static HTML by default. |
| Not using Resend for email | Requires domain verification — doesn't scale for client sites with weak domains |

---

## Open Questions / To Decide

- Notion free plan database limits: What's the workaround for content-heavy next projects? Options: Paid Notion ($10/mo), Payload CMS (start fresh), Supabase
- SEO impact when migrating existing WordPress sites to custom code: Research needed
- Analytics for custom-code sites: Native tracking via script vs Google Analytics integration
