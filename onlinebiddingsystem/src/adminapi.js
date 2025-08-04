import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './adminConstants';

const adminapi = axios.create({
  baseURL: 'http://localhost:8000',
});

adminapi.interceptors.request.use((config) => {
  // Skip Authorization header for login and token refresh endpoints
  if (config.url === '/api/admin-login/' || config.url === '/api/token/refresh/') {
    return config;
  }
  
  const token = localStorage.getItem('adminAccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default adminapi;
