import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
});

export const httpCdn = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CDN_URL || "http://localhost:8000",
});

export default http;
