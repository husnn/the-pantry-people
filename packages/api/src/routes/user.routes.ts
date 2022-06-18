import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(userController: UserController): Router {
  const router = Router();

  router.post(
    '/me/location',
    authMiddleware,
    body('postcode').exists().isPostalCode('GB'),
    (req: Request, res: Response, next: NextFunction) =>
      userController.updateLocation(req, res, next)
  );

  return router;
}
