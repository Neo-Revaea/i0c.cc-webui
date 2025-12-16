'use client';

import type { RedirectConfigPayload } from "@/lib/github";

export type ApiConfigResponse = {
  config: RedirectConfigPayload;
  history: unknown;
};

export async function fetchRedirectsConfig(): Promise<ApiConfigResponse> {
  const response = await fetch("/api/config", { cache: "no-store" });
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
    const text = typeof data?.error === "string" ? data.error : "加载配置失败";
    throw new Error(text);
  }
  return (await response.json()) as ApiConfigResponse;
}

export async function saveRedirectsConfig(input: {
  content: string;
  sha: string;
  message: string;
}): Promise<{ sha: string; commitUrl: string }> {
  const response = await fetch("/api/config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
    const text = typeof data?.error === "string" ? data.error : "保存失败";
    throw new Error(text);
  }

  return (await response.json()) as { sha: string; commitUrl: string };
}
