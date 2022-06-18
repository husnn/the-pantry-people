export class WrappedError extends Error {
  constructor(err: Error, message?: string) {
    super();

    this.name = Error.name;
    this.message = `${message} ${err.message}`;
    this.stack = err.stack;
    this.cause = err.cause;
  }
}
