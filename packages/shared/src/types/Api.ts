/* eslint-disable @typescript-eslint/no-empty-interface */

import { CurrentUserDTO } from '../dto';

export type HttpMethod = 'GET' | 'POST' | 'PUT';

export type AuthLevel = 'none' | 'required' | 'optional';

export interface Request {
  method: HttpMethod;
  endpoint: string;
  authentication?: AuthLevel;
  body?: object;
  params?: any;
  headers?: any;
  ignoreCredentials?: boolean;
}

export interface Response<T = any> {
  success: boolean;
  status: number;
  body?: T;
  error?: string;
  message?: string;
}

export interface SignupRequest extends Request {}
export interface SignupResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface LoginRequest extends Request {}
export interface LoginResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface SignoutRequest extends Request {}
export interface SignoutResponse extends Response {}
