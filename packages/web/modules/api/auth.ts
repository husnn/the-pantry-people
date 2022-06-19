import {
  LoginRequest,
  LoginResponse,
  SignoutRequest,
  SignoutResponse,
  SignupRequest,
  SignupResponse
} from '@tpp/shared';
import { AxiosError } from 'axios';
import { removeAuth } from '../auth/utils';
import { ApiClient } from '../http';

export const signup = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  postcode: string
) =>
  ApiClient().request<SignupResponse, SignupRequest>({
    method: 'POST',
    endpoint: '/auth/signup',
    authentication: 'none',
    body: {
      firstName,
      lastName,
      email,
      password,
      postcode
    }
  });

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
