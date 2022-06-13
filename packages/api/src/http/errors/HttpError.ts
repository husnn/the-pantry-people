export class HttpError extends Error {
  status: number;

  constructor(message?: string, status?: number) {
    super();

    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || 500;
  }
}

export default HttpError;
