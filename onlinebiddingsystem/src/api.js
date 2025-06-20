import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:8000",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const PUBLIC_ENDPOINTS = ['api/user/register/', '/login', '/forgot-password', '/api/token/'];

  const isPublic = PUBLIC_ENDPOINTS.some((url) =>
    config.url.startsWith(url)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default api;
