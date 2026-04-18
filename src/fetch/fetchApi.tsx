import { createAsyncThunk } from "@reduxjs/toolkit";

interface ApiProps {
  endpoint: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const FetchAPI = createAsyncThunk(
  "api/fetch",
  async ({ body, endpoint, headers, method = "GET" }: ApiProps, { rejectWithValue }) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: ["POST", "PUT", "PATCH"].includes(method)
          ? JSON.stringify(body)
          : undefined,
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({ error: "Invalid JSON response" }));

      if (!res.ok) {
        return rejectWithValue(data?.error || "Something went wrong");
      }

      return data;
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return rejectWithValue("Request timed out");
      }
      const err = error as Error;
      return rejectWithValue(err.message || "Something went wrong");
    } finally {
      clearTimeout(timeout);
    }
  }
);