import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';
import { Role1 } from '../database/models';

export const authorizeRole = (...roles: Role1[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new AppError('Unauthorized', 401));
    }

    if (!roles.includes(user.globalRole)) {
      return next(new AppError('Forbidden: insufficient permissions', 403));
    }

    next();
  };
};
