export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiError = {
  message: string;
  status?: number;
};

export type ApiClientOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<TResponse>(
  path: string,
  { method = "GET", body, token }: ApiClientOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Accept": "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const resp = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!resp.ok) {
    let message = "An error occurred while communicating with the API";
    try {
      const json = await resp.json();
      if (json && typeof json.error === "string") {
        message = json.error;
      }
    } catch {
      //
    }

    const error: ApiError = { message, status: resp.status };
    throw error;
  }

  // No Content
  if (resp.status === 204) {
    return undefined as TResponse;
  }

  return (await resp.json()) as TResponse;
}

