import axios from 'axios';

// Dev: Vite proxy intercepts /api → localhost:5000
// Prod: VITE_API_URL=https://your-api.onrender.com/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
