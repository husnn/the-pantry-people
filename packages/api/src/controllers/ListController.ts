import { InventoryService, ListService, WrappedError } from '@tpp/core';
import { CreateListResponse, Item } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpResponse, ValidationError } from '../http';

class ListController {
  private listService: ListService;
  private inventoryService: InventoryService;

  constructor(listService: ListService, inventoryService: InventoryService) {
    this.listService = listService;
    this.inventoryService = inventoryService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!validationResult(req).isEmpty())
        throw new ValidationError('Invalid list of items provided.');

      const items: Item[] = req.body.items;
      if (!this.inventoryService.validate(items.map((i) => i.id)))
        throw new ValidationError(
          'One or more requested items are not available.'
        );

      // Ensure consistent labels
      items.forEach((i) => {
        i.label = this.inventoryService.getLabel(i.id);
      });

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
