export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json = await res.json();
  if (!json.ok) throw new Error(json.message ?? "Request failed");
  return json.data as T;
}

export async function apiMutate<T>(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.ok) {
    const err = new Error(json.message ?? "Request failed") as Error & {
      fieldErrors?: Record<string, string>;
    };
    err.fieldErrors = json.errors;
    throw err;
  }
  return json.data as T;
}

export async function checkDashboardAuth(): Promise<boolean> {
  const res = await fetch("/api/admin/dashboard", { method: "HEAD" }).catch(() => null);
  if (!res) return false;
  return res.status !== 401;
}
