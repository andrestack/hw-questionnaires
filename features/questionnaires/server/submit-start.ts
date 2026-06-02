"use server";

import { sendAuthenticatedWebhook } from "@/lib/webhook-auth";
import { type SubmitResult } from "../lib/types";

export async function submitStart(data: Record<string, unknown>): Promise<SubmitResult> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: "N8N_WEBHOOK_URL not configured" };
  }

  const result = await sendAuthenticatedWebhook(webhookUrl, "website", data);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
