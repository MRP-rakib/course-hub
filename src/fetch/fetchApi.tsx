import { createAsyncThunk } from "@reduxjs/toolkit";
interface apiProps {
  endpoint: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?:Record<string, unknown>;
  headers?: Record<string, string>;
}
export const FetchAPI = createAsyncThunk(
  "api",
  async ({ body, endpoint,headers,method='GET' }: apiProps, { rejectWithValue }) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: method!== 'GET'? JSON.stringify(body):undefined
      })
      const data = await res.json().catch(()=>null)
      if (!res.ok){
        return rejectWithValue(
          data?.message||'something went wrong'
        )
      }
      return data
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || "something went wrong");
    }
  },
);
