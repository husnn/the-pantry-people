import { Router } from 'express';
import initAuthRoutes from './auth.routes';

export default function init(router: Router, authController) {
  router.use('/auth', initAuthRoutes(authController));
}
