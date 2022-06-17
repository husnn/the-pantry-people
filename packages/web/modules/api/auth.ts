import {
  LoginRequest,
  LoginResponse,
  SignoutRequest,
  SignoutResponse
} from '@tpp/shared';
import { AxiosError } from 'axios';
import { removeAuth } from '../auth/utils';
import { ApiClient } from '../http';

export const login = (email: string, password: string) =>
  ApiClient().request<LoginResponse, LoginRequest>({
    method: 'POST',
    endpoint: '/auth/login',
    authentication: 'none',
    body: {
      email,
      password
    }
  });

export const signout = () =>
  ApiClient()
    .request<SignoutResponse, SignoutRequest>({
      method: 'POST',
      endpoint: '/auth/signout',
      authentication: 'required'
    })
    .then(removeAuth)
    .catch((err: AxiosError) => {
      if (err.response?.status == 401) removeAuth();
    });
