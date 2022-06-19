import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import CharityController from '../controllers/CharityController';
import InventoryController from '../controllers/InventoryController';
import ListController from '../controllers/ListController';
import UserController from '../controllers/UserController';
import initAuthRoutes from './auth.routes';
import initCharityRoutes from './charity.routes';
import initItemRoutes from './item.routes';
import initListRoutes from './list.routes';
import initUserRoutes from './user.routes';

export default function init(
  router: Router,
  authController: AuthController,
  userController: UserController,
  charityController: CharityController,
  listController: ListController,
  inventoryController: InventoryController
) {
  router.use('/auth', initAuthRoutes(authController));
  router.use('/users', initUserRoutes(userController));
  router.use('/charities', initCharityRoutes(charityController));
  router.use('/lists', initListRoutes(listController));
  router.use('/items', initItemRoutes(inventoryController));
}
