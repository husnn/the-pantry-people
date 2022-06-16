/* eslint-disable @typescript-eslint/no-empty-interface */

import { Point } from 'geojson';
import { CharityDTO, CurrentUserDTO } from '../dto';

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

export interface SignupRequest extends Request {
  method: 'POST';
  endpoint: '/auth/signup';
  authentication: 'none';
  body: {
    email: string;
    password: string;
  };
}
export interface SignupResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface LoginRequest extends Request {
  method: 'POST';
  endpoint: '/auth/login';
  authentication: 'none';
  body: {
    email: string;
    password: string;
  };
}
export interface LoginResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface SignoutRequest extends Request {
  method: 'POST';
  endpoint: '/auth/signout';
  authentication: 'required';
}
export interface SignoutResponse extends Response {}

export interface CreateCharityRequest extends Request {
  method: 'POST';
  endpoint: '/charities';
  authentication: 'required';
  body: {
    name: string;
    coordinates?: Point;
  };
}
export interface CreateCharityResponse extends Response {
  charity: CharityDTO;
}
