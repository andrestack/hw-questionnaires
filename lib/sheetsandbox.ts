"use server";

interface SheetSandboxResponse {
  success: boolean;
  error?: string;
}

export async function appendToSheet(
  tabName: string,
  data: Record<string, string>
): Promise<SheetSandboxResponse> {
  const token = process.env.SHEETSANDBOX_TOKEN;

  if (!token) {
    return { success: false, error: "SHEETSANDBOX_TOKEN not configured" };
  }

  try {
    const response = await fetch("https://api.sheetsandbox.com/v1/append", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tab: tabName,
        data,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `SheetSandbox API error: ${response.status} ${errorText}`,
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
