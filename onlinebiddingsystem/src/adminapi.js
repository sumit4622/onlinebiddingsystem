import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './adminConstants';

const adminapi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

adminapi.interceptors.request.use((config) => {
  if (config.url === '/api/admin-login/' || config.url === '/api/token/refresh/') {
    return config;
  }
  
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default adminapi;
