import { isValidCharityName, isValidPassword } from '@tpp/shared';
import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import CharityController from '../controllers/CharityController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(charityController: CharityController): Router {
  const router = Router();

  router.post(
    '/',
    body('name').exists().trim().custom(isValidCharityName),
    body('postcode').exists().isPostalCode('GB'),
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      charityController.create(req, res, next)
  );

  router.post(
    '/signup',
    body('email').exists().isEmail().normalizeEmail(),
    body('password').custom(isValidPassword),
    body('name').exists().trim().custom(isValidCharityName),
    body('postcode').exists().isPostalCode('GB'),
    (req: Request, res: Response, next: NextFunction) =>
      charityController.signup(req, res, next)
  );

  return router;
}
