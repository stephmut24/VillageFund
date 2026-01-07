import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validators/auth.validator';

const authRoute = Router();

/**
 * POST /auth/login
 */
authRoute.post('/login', validate(loginSchema), AuthController.login);

export default authRoute;
