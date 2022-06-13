import HttpError from './HttpError';

export class ValidationError extends HttpError {
  constructor(message?: string, status?: number) {
    super(message || 'Malformed request.', status || 400);
  }
}

export default ValidationError;
