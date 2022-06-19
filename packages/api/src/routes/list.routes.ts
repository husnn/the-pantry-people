import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import ListController from '../controllers/ListController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(listController: ListController): Router {
  const router = Router();

  router.post(
    '/',
    body('items').isArray({ min: 1 }),
    body('items.*.name').isString().notEmpty().trim(),
    body('items.*.quantity').isInt({ min: 1, max: 10 }).optional(),
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      listController.create(req, res, next)
  );

  return router;
}
