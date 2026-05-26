"use server";

import { sendWebhook } from "@/lib/notify";
import { type SubmitResult } from "../lib/types";

export async function submitBlueprint(data: Record<string, unknown>): Promise<SubmitResult> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL_BLUEPRINT;

  if (!webhookUrl) {
    return { success: false, error: "N8N_WEBHOOK_URL_BLUEPRINT not configured" };
  }

  const result = await sendWebhook(webhookUrl, data);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
