
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';


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
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error : any) => Promise.reject(error)
);


httpClient.interceptors.response.use(
  (response: AxiosResponse) => response, 
  async (error : any) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; 
      
      try {
        const response = await axios.post<{ accessToken: string }>(
          `${httpClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        setInMemoryToken(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        
        return httpClient(originalRequest);
        
      } catch (refreshError) {
        setInMemoryToken(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/login?expired=true';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);