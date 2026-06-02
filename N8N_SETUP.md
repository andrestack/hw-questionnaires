# n8n Webhook Setup Guide

This document explains how to set up the n8n workflows for the Hinterland Web questionnaires.

## Architecture Overview

All three forms submit to n8n webhooks:

```
Form Submission
       ↓
Next.js Server Action
       ↓
POST to n8n webhook
       ↓
n8n Workflow:
  1. Process/parse form data
  2. Call Claude API (Blueprint only)
  3. Save to Google Sheet
  4. Send emails (confirmation to client, notification to André)
  5. Return success response
```

## Files Created

### Next.js Code
- ✅ `lib/webhook.ts` — Simple webhook utility
- ✅ `features/questionnaires/server/submit-start.ts` — Website form submission
- ✅ `features/questionnaires/server/submit-audit.ts` — AIOS form submission
- ✅ `features/questionnaires/server/submit-blueprint.ts` — Blueprint form submission
- ✅ `.env.example` — Environment variables

### n8n Workflow JSON Files
- ✅ `n8n-workflow-website.json` — Website questionnaire workflow
- ✅ `n8n-workflow-aios.json` — AIOS pre-audit workflow
- ✅ `n8n-workflow-blueprint.json` — Blueprint lead magnet workflow (includes Claude AI)

---

## Step-by-Step Setup

### 1. Configure Environment Variables

Create/update your `.env.local` file:

```bash
# n8n Webhook URLs (create these webhooks in n8n first)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/website-form
N8N_WEBHOOK_URL_AIOS=https://your-n8n-instance.com/webhook/aios-form
N8N_WEBHOOK_URL_BLUEPRINT=https://your-n8n-instance.com/webhook/blueprint-form
```

### 2. Set Up Google Sheet

Create a Google Sheet with **3 tabs**:

#### Tab 1: "Website"
Column headers:
```
submittedAt, businessName, businessDescription, currentWebsite, primaryGoal, desiredFeelings, turnOffs, likedWebsites, styleWords, avoid, neededPages, brandingStatus, photoStatus, budget, timeline, additionalInfo, name, email, phone, qualificationTag
```

#### Tab 2: "AIOS"
Column headers:
```
submittedAt, businessName, businessDescription, teamSize, clientJourney, timeSink, adminHours, clientCommunication, proposalsQuotes, invoicing, jobManagement, scheduling, fileStorage, otherTools, toolFrustrations, automationAttempts, topFrustrations, fixOvernight, repetitiveTasks, techComfort, successOutcome, anythingElse, fullName, email, phone
```

#### Tab 3: "Leads"
Column headers:
```
submittedAt, businessType, teamSize, biggestTimeDrain, repeatedTasks, weeklyAdminHours, fiveHoursMeaning, tools, toolsIntegrated, automationHistory, firstName, email, businessName, blueprintSentAt, automation1_name, automation1_description, automation1_hoursSaved, automation1_complexity, automation2_name, automation2_description, automation2_hoursSaved, automation2_complexity, automation3_name, automation3_description, automation3_hoursSaved, automation3_complexity, quickWin, highIntentTag
```

### 3. Import n8n Workflows

1. **Open n8n** and go to Workflows
2. Click **"Import from File"** for each workflow:
   - Import `n8n-workflow-website.json`
   - Import `n8n-workflow-aios.json`
   - Import `n8n-workflow-blueprint.json`

### 4. Configure Credentials

In n8n, you need to set up these credentials:

#### Google Sheets
1. Go to Settings → Credentials
2. Add new credential: **Google Sheets OAuth2**
3. Follow the OAuth setup process
4. Update the credential ID in each workflow (replace `YOUR_CREDENTIAL_ID`)

#### Gmail
1. Add new credential: **Gmail OAuth2**
2. Connect your Gmail account (andre@hinterlandweb.com)
3. Update the credential ID in each workflow

#### Anthropic API (Blueprint only)
1. Add new credential: **HTTP Header Auth**
2. Name: `Anthropic API`
3. Header Name: `x-api-key`
4. Header Value: Your Anthropic API key (from https://console.anthropic.com/)
5. Update the credential ID in the Blueprint workflow

### 5. Set Environment Variables in n8n

In n8n Settings → Variables, add:

```
GOOGLE_SHEET_ID=your-google-sheet-id
FROM_EMAIL=noreply@hinterlandweb.com
```

To get your Google Sheet ID:
- Open your Google Sheet
- Copy the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
- The `SHEET_ID` is the long string between `/d/` and `/edit`

### 6. Activate Webhooks

For each workflow:

1. **Update the webhook path** in the first node to match your environment variable
   - Website: `website-form`
   - AIOS: `aios-form`
   - Blueprint: `blueprint-form`

2. **Save and Activate** each workflow

3. **Copy the webhook URLs** and update your `.env.local` file

### 7. Update Calendly Link (Blueprint)

In the Blueprint workflow, update the email template:
- Find the "Email Blueprint to Client" node
- Replace `https://calendly.com/YOUR_LINK` with your actual Calendly link

---

## Testing

### Test Website Form
```bash
curl -X POST https://your-n8n-instance.com/webhook/website-form \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "website",
    "submittedAt": "2026-06-01T14:30:00.000Z",
    "businessName": "Test Business",
    "businessDescription": "Test description",
    "currentWebsite": "",
    "primaryGoal": "Generate leads",
    "desiredFeelings": ["Trusted", "Professional"],
    "turnOffs": "",
    "likedWebsites": "apple.com",
    "styleWords": ["Minimal", "Clean"],
    "avoid": "",
    "neededPages": ["Home", "About"],
    "brandingStatus": "Logo only",
    "photoStatus": "Stock images",
    "budget": "$5,000–$8,000",
    "timeline": "2–3 months",
    "additionalInfo": "",
    "name": "Test User",
    "email": "test@example.com",
    "phone": ""
  }'
```

### Test AIOS Form
```bash
curl -X POST https://your-n8n-instance.com/webhook/aios-form \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "aios",
    "submittedAt": "2026-06-01T14:30:00.000Z",
    "businessName": "Test Business",
    "businessDescription": "Test description",
    "teamSize": "2–5",
    "clientJourney": "Phone → Quote → Book",
    "timeSink": "Chasing payments",
    "adminHours": "5–10 hours",
    "clientCommunication": "Gmail",
    "proposalsQuotes": "Xero",
    "invoicing": "Xero",
    "jobManagement": "Trello",
    "scheduling": "Google Calendar",
    "fileStorage": "Google Drive",
    "otherTools": "",
    "toolFrustrations": "No integration",
    "automationAttempts": "",
    "topFrustrations": "Manual data entry",
    "fixOvernight": "Auto invoicing",
    "repetitiveTasks": "Follow-ups",
    "techComfort": "3 — Comfortable",
    "successOutcome": "Save 5 hours/week",
    "anythingElse": "",
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": ""
  }'
```

### Test Blueprint Form
```bash
curl -X POST https://your-n8n-instance.com/webhook/blueprint-form \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "blueprint",
    "submittedAt": "2026-06-01T14:30:00.000Z",
    "businessType": "Trades",
    "teamSize": "2–5",
    "biggestTimeDrain": "Chasing quotes",
    "repeatedTasks": ["Replying to enquiries", "Chasing payments"],
    "weeklyAdminHours": "5–10 hours",
    "fiveHoursMeaning": "More clients",
    "tools": ["Gmail", "Xero"],
    "toolsIntegrated": "No — I re-enter data",
    "automationHistory": "Not yet",
    "firstName": "Test",
    "email": "test@example.com",
    "businessName": "Test Trades"
  }'
```

---

## Troubleshooting

### Webhook not receiving data
- Check that the webhook URL is correct
- Verify the n8n workflow is activated (toggle should be green)
- Check n8n execution logs for incoming requests

### Google Sheet not updating
- Check credential permissions (needs write access)
- Verify tab names exactly match (case-sensitive)
- Check n8n execution logs for errors

### Claude API failing (Blueprint)
- Verify Anthropic API key is valid
- Check API credits/billing on Anthropic console
- Review n8n execution logs for HTTP error codes

### Emails not sending
- Verify Gmail OAuth is connected and not expired
- Check spam folders
- Review n8n execution logs for bounce/ rejection messages

---

## Payload Reference

All webhooks receive this enriched payload from Next.js:

```json
{
  "formType": "website|aios|blueprint",
  "submittedAt": "2026-06-01T14:30:00.000Z",
  ...all form fields...
}
```

Arrays are sent as JSON arrays (e.g., `["Trusted", "Professional"]`). The n8n workflow converts them to comma-separated strings before saving to Google Sheets.

---

## Security Notes

1. **Keep webhook URLs private** — don't commit them to public repos
2. **HTTPS only** — never use webhook URLs over HTTP
3. **Rate limiting** — consider adding rate limiting in n8n for production

---

## Support

For issues or questions:
1. Check n8n execution logs (enable "Save Successful Executions" for debugging)
2. Review the workflow JSON files in this repo
3. Verify all credential connections are active
