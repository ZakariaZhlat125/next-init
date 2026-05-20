import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const session = await getSession();
        
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Response] ${response.status} ${response.config.url}`);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { signIn } = await import('next-auth/react');
            await signIn();
            return this.instance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        if (process.env.NODE_ENV === 'development') {
          console.error('[API Error]', error.response?.data || error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
