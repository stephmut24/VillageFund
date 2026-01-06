import { Router } from 'express';
import { UserController } from '../controllers/';
import { validate, authenticate, authorizeRole } from '../middlewares/';
import { createUserSchema } from '../validators/';
import {Role1} from '../database/models'

const userRoute: Router = Router();

/**
 * POST /users
 * Create a new user
 */
userRoute.post(
  '/',
  validate(createUserSchema),
  UserController.createUser
);

/**
 * GET /users
 * Get all users
 */
userRoute.get(
  '/',
  authenticate,
  authorizeRole(Role1.User, Role1.SUPER_ADMIN),
  UserController.getUsers
);

/**
 * GET /users/:id
 * Get user by id
 */
userRoute.get(
  '/:id',
    authenticate,
  authorizeRole(Role1.User, Role1.SUPER_ADMIN),
  UserController.getUserById
);

/**
 * DELETE /users/:id
 * Delete user
 */
userRoute.delete(
  '/:id',
    authenticate,
  authorizeRole(Role1.User, Role1.SUPER_ADMIN),
  UserController.deleteUser
);

export default userRoute;
