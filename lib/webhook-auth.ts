"use server";

interface WebhookPayload {
  formType: string;
  submittedAt: string;
  [key: string]: unknown;
}

interface WebhookResponse {
  success: boolean;
  error?: string;
}

/**
 * Sends authenticated webhook to n8n with form data
 * Includes formType discriminator and timestamp for tracking
 */
export async function sendAuthenticatedWebhook(
  url: string,
  formType: string,
  data: Record<string, unknown>
): Promise<WebhookResponse> {
  if (!url) {
    return { success: false, error: "Webhook URL not configured" };
  }

  const secret = process.env.N8N_WEBHOOK_SECRET;

  // Enrich payload with metadata
  const payload: WebhookPayload = {
    formType,
    submittedAt: new Date().toISOString(),
    ...data,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authentication header if secret is configured
  if (secret) {
    headers["X-Webhook-Secret"] = secret;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Webhook error: ${response.status} ${errorText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
