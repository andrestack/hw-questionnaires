"use server";

import { appendToSheet } from "@/lib/sheetsandbox";
import { sendWebhook } from "@/lib/notify";
import { type SubmitResult } from "../lib/types";

export async function submitAudit(data: Record<string, unknown>): Promise<SubmitResult> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL_AIOS;

  const sheetPromise = appendToSheet("AIOS", data as Record<string, string>);
  const webhookPromise = webhookUrl
    ? sendWebhook(webhookUrl, data)
    : Promise.resolve({ success: true as const });

  const [sheetResult, webhookResult] = await Promise.all([
    sheetPromise,
    webhookPromise,
  ]);

  if (!sheetResult.success) {
    return { success: false, error: sheetResult.error };
  }

  if (!webhookResult.success) {
    // Log webhook failure but don't fail the submission
    console.error("Webhook failed:", webhookResult.error);
  }

  return { success: true };
}
