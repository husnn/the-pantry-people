import {
  GetSummaryForCharityRequest,
  GetSummaryForCharityResponse,
  SignupCharityRequest,
  SignupCharityResponse
} from '@tpp/shared';
import { ApiClient } from '../http';

export const signupCharity = (
  email: string,
  password: string,
  name: string,
  postcode: string
) =>
  ApiClient().request<SignupCharityResponse, SignupCharityRequest>({
    method: 'POST',
    endpoint: '/charities/signup',
    authentication: 'none',
    body: {
      email,
      password,
      name,
      postcode
    }
  });

export const getSummaryForCharity = () =>
  ApiClient().request<
    GetSummaryForCharityResponse,
    GetSummaryForCharityRequest
  >({
    method: 'GET',
    endpoint: '/charities/summary',
    authentication: 'required'
  });
