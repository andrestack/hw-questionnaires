"use server";

import { sendWebhook } from "@/lib/webhook";
import { type SubmitResult } from "../lib/types";

export async function submitAudit(data: Record<string, unknown>): Promise<SubmitResult> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL_AIOS;

  if (!webhookUrl) {
    return { success: false, error: "N8N_WEBHOOK_URL_AIOS not configured" };
  }

  const result = await sendWebhook(webhookUrl, "aios", data);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
