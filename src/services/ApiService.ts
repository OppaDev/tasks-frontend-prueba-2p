import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default class ApiService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expirado o inválido, redirigir al login
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        console.error('API Error:', error.response);
        return Promise.reject(error);
      }
    );
  }

  protected async get(endpoint: string, config?: AxiosRequestConfig) {
    return this.api.get(endpoint, config);
  }

  protected async post(endpoint: string, data: any, config?: AxiosRequestConfig) {
    return this.api.post(endpoint, data, config);
  }

  protected async put(endpoint: string, data: any, config?: AxiosRequestConfig) {
    return this.api.put(endpoint, data, config);
  }

  protected async delete(endpoint: string, config?: AxiosRequestConfig) {
    return this.api.delete(endpoint, config);
  }
}