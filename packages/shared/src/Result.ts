export class Result<T = undefined> {
  public success: boolean;

  public data?: T;
  public error?: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  public static ok<T>(data?: T): Result<T> {
    return new Result<T>(true, data);
  }

  public static fail<T>(error?: string): Result<T> {
    return new Result<T>(false, undefined, error);
  }
}

export default Result;
