import { ListService, WrappedError } from '@tpp/core';
import { CreateListResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpResponse, ValidationError } from '../http';

class ListController {
  private listService: ListService;

  constructor(listService: ListService) {
    this.listService = listService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { items } = req.body;

      if (!validationResult(req).isEmpty())
        throw new ValidationError('Invalid list of items provided.');

      const result = await this.listService.create(req.session.user, items);
      if (!result.success)
        throw new WrappedError(result.error, 'Could not create list.');

      return new HttpResponse<CreateListResponse>(res, { list: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default ListController;
