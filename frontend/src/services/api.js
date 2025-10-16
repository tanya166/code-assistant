
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const reviewAPI = {
  upload: (formData) => api.post('/review/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getAll: () => api.get('/review/history'),
  getById: (id) => api.get(`/review/${id}`),
};

export default api;