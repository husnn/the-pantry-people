import HttpError from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message?: string, status?: number) {
    super(message || 'Resource not found.', status || 400);
  }
}

export default NotFoundError;
