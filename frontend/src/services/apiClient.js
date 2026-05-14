import axios from "axios";

const viteApiUrl = import.meta.env?.VITE_API_URL;
const legacyApiUrl = typeof process !== "undefined" ? process.env?.REACT_APP_API_URL : "";
const configuredBaseUrl = viteApiUrl || legacyApiUrl || "https://api.ricardotech.com";

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function buildApiPath(path) {
  if (!path) return API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export default apiClient;
