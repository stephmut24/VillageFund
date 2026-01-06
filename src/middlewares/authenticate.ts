import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';
import { Role1 } from '../database/models/';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: Role1;
  };
}

export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: Role1;
    };

    req.user = decoded;
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
