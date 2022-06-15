import { Request, Response } from '@feedelity/shared';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import HttpClient from './HttpClient';

export default class AxiosClient extends HttpClient {
  private axios: AxiosInstance;

  constructor() {
    super();
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'
    });
  }

  async request<U extends Response | null = Response>(
    req: Request
  ): Promise<U> {
    return this.axios
      .request({
        method: req.method,
        url: req.endpoint,
        data: req.method === 'POST' || req.method === 'PUT' ? req.body : null,
        params: req.params,
        headers: req.headers,
        withCredentials: !req.ignoreCredentials
      })
      .then((response: AxiosResponse<U>) => {
        return Promise.resolve(response.data);
      })
      .catch((err: AxiosError<U>) => {
        return Promise.reject(
          err.response ? err.response.data?.message : err.message
        );
      });
  }
}
