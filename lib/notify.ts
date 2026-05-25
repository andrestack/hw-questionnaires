"use server";

interface NotifyResponse {
  success: boolean;
  error?: string;
}

export async function sendWebhook(
  url: string,
  payload: Record<string, unknown>
): Promise<NotifyResponse> {
  if (!url) {
    return { success: false, error: "Webhook URL not configured" };
  }

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
