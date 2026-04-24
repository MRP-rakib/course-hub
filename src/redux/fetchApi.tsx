import { createAsyncThunk } from "@reduxjs/toolkit";

interface ApiProps {
  endpoint: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}
export const FetchAPI = createAsyncThunk('fetch',async({endpoint,method,body,headers}:ApiProps,thunkApi)=>{
       try {
         const res = await fetch(endpoint,{
          method,
          credentials:'include',
          headers:{'Content-Type':'application/json',...headers},
          body:method!=='GET'?JSON.stringify(body):undefined
        })
        const data = await res.json()        
        if(!res.ok){
          return thunkApi.rejectWithValue(data?.message||'request failed')
        }
        return data
       } catch (error) {
        console.log('fethapi error :',error);
        return thunkApi.rejectWithValue('newtwork error or server not reachable')
       }
})
