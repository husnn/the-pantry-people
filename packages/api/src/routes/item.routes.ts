import { NextFunction, Request, Response, Router } from 'express';
import InventoryController from '../controllers/InventoryController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(inventoryController: InventoryController): Router {
  const router = Router();

  router.get(
    '/',
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      inventoryController.list(req, res, next)
  );

  return router;
}
