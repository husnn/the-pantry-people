export class Result<T = undefined> {
  public success: boolean;

  public data?: T;
  public error?: Error;
  public reason?: string;

  constructor(success: boolean, data?: T, error?: Error, reason?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.reason = reason;
  }

  public static ok<T>(data?: T): Result<T> {
    return new Result<T>(true, data);
  }

  public static fail<T>(error?: Error, reason?: string): Result<T> {
    return new Result<T>(false, undefined, error, reason);
  }
}

export default Result;
