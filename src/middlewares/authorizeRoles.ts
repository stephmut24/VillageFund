import { NextFunction, Response } from 'express';
import { AppError } from '../utils';
import { Role1 } from '../database/models';
import { AuthRequest } from './authenticate';

export const authorizeRole =
  (...allowedRoles: Role1[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }

    next();
  };
