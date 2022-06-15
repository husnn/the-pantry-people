import { Request, Response } from '@tpp/shared';

export default abstract class HttpClient {
  abstract request<
    U extends Response | null = Response,
    T extends Request = Request
  >(req: T): Promise<U>;
}
