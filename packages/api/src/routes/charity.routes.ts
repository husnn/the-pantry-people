import { isValidCharityName, isValidCoordinates } from '@tpp/shared';
import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import CharityController from '../controllers/CharityController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(charityController: CharityController): Router {
  const router = Router();

  router.post(
    '/',
    body('name').exists().trim().custom(isValidCharityName),
    body('coordinates').exists().custom(isValidCoordinates),
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      charityController.create(req, res, next)
  );

  return router;
}
