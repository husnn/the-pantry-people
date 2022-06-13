import HttpError from './HttpError';

export class AuthenticationError extends HttpError {
  constructor(message?: string, status?: number) {
    super(
      message || 'You do not have permission to access this.',
      status || 403
    );
  }
}

export default AuthenticationError;
