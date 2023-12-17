// httpInterceptor.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

class HttpInterceptor {
  private instance: AxiosInstance;

  constructor(apiKey: string, organization: string) {
    this.instance = axios.create({
      baseURL: 'https://api.openai.com/v1',
      timeout: 5000,
    });

    this.instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${apiKey}`;
        config.headers['OpenAI-Organization'] = organization;

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error('Server response error:', error.response.data);
        } else if (error.request) {
          console.error('No server response:', error.request);
        } else {
          console.error('Settings server error', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export default HttpInterceptor;
