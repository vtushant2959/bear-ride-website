import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bearride_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored credentials
      localStorage.removeItem("bearride_token");
      localStorage.removeItem("bearride_user");
      localStorage.removeItem("bearride_active_role");
      // Dispatch event — AuthContext listens and updates React state cleanly
      // This avoids a full page reload (window.location.href) which caused the
      // login redirect loop: clear localStorage → page reload → no user → redirect.
      window.dispatchEvent(new CustomEvent("auth:unauthorised"));
    }
    return Promise.reject(error);
  }
);

export default api;
