import { isValidPassword } from '@tpp/shared';
import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/AuthController';

export default function init(authController: AuthController): Router {
  const router = Router();

  router.post(
    '/signup',
    check('email').isEmail().normalizeEmail(),
    check('password').custom(isValidPassword),
    (req: Request, res: Response, next: NextFunction) =>
      authController.signup(req, res, next)
  );

  router.post(
    '/login',
    check('email').isEmail().normalizeEmail(),
    check('password').custom(isValidPassword),
    (req: Request, res: Response, next: NextFunction) => {
      authController.login(req, res, next);
    }
  );

  return router;
}
