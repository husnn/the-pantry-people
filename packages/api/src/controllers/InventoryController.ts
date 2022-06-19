import { InventoryService, ListService } from '@tpp/core';
import { GetInventoryResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../http';

class InventoryController {
  private listService: ListService;
  private inventoryService: InventoryService;

  constructor(listService: ListService, inventoryService: InventoryService) {
    this.listService = listService;
    this.inventoryService = inventoryService;
  }

  async list(req: Request, res: Response, next: NextFunction) {
    return new HttpResponse<GetInventoryResponse>(res, {
      items: this.inventoryService.list()
    });
  }
}

export default InventoryController;
