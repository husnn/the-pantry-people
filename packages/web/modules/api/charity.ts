import { SignupCharityRequest, SignupCharityResponse } from '@tpp/shared';
import { ApiClient } from '../http';

export const SignupCharity = (
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
