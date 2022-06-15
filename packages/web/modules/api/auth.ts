import { LoginRequest, LoginResponse } from '@tpp/shared';
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
