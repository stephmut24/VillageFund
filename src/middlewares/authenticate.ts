import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';
import { verifyToken } from '../utils/jwt';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // ici notre userPayload typé
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
