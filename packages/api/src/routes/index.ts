import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import CharityController from '../controllers/CharityController';
import initAuthRoutes from './auth.routes';
import initCharityRoutes from './charity.routes';

export default function init(
  router: Router,
  authController: AuthController,
  charityController: CharityController
) {
  router.use('/auth', initAuthRoutes(authController));
  router.use('/charities', initCharityRoutes(charityController));
}
