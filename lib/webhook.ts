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
 * Sends webhook to n8n with form data
 * Includes formType discriminator and timestamp for tracking
 */
export async function sendWebhook(
  url: string,
  formType: string,
  data: Record<string, unknown>
): Promise<WebhookResponse> {
  if (!url) {
    return { success: false, error: "Webhook URL not configured" };
  }

  // Enrich payload with metadata
  const payload: WebhookPayload = {
    formType,
    submittedAt: new Date().toISOString(),
    ...data,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
