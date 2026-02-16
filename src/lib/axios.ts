import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "/",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.message || "An unexpected error occurred.");
    return Promise.reject(error);
  }
);

export default api;
