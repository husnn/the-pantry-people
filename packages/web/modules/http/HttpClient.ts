import { Request, Response } from '@feedelity/shared';

export default abstract class HttpClient {
  abstract request<
    U extends Response | null = Response,
    T extends Request = Request
  >(req: T): Promise<U>;
}
