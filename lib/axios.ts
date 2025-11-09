// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/", // your API routes are relative to the app
  withCredentials: true, // ✅ send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
