import axios from 'axios';
import { ACCESS_TOKEN } from './adminConstants';

const adminapi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

adminapi.interceptors.request.use((config) => {
  if (config.url.endsWith('admin-login/') || config.url.endsWith('token/refresh/')) {
    return config;
  }

  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No access token found in localStorage");
  }

  return config;
});

export default adminapi;
