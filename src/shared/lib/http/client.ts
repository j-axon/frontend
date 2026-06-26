// src/shared/lib/http/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from './api-error';
import { HttpStatus } from './http-status';

let _accessToken: string | null = null;

export const setInMemoryToken = (token: string | null): void => {
  _accessToken = token;
};

export const getInMemoryToken = (): string | null => {
  return _accessToken;
};

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}


let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};


export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getInMemoryToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (!error.response) {
      return Promise.reject(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Network Error"));
    }

    const { status, data } = error.response;


    if (status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        httpClient
          .post('/auth/refresh')
          .then(({ data }) => {
            const newToken = data.accessToken;
            
          
            setInMemoryToken(newToken);
            
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(httpClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            setInMemoryToken(null);
            if (typeof window !== 'undefined') {
              window.location.href = '/login?expired=true';
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    
    const errorMessage = data?.message || "An unexpected error occurred";
    return Promise.reject(new ApiError(status as any, errorMessage, data?.details));
  }
);