import { Response } from '@feedelity/shared';
import { Response as ExpressResponse } from 'express';

export class HttpResponse<U extends Response> {
  constructor(res: ExpressResponse, data?: Partial<U>) {
    const success = data
      ? data.success || typeof data.error === 'undefined'
      : true;

    const status = data?.status || 200;

    const response: Response = {
      ...data,
      success,
      status
    };

    res.status(status).send(response);
  }
}

export default HttpResponse;
