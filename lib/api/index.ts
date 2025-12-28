// lib/api.ts
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  '/api';

// إذا كنت في بيئة التطوير وتريد استخدام Proxy
if (process.env.NODE_ENV === 'development') {
  // استخدم المسار النسبي إذا كان هناك Proxy
  baseURL = '/api'; // إذا كنت تستخدم rewrites في next.config.js
}

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
  // إضافة withCredentials إذا كنت تحتاج إرسال الكوكيز
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;