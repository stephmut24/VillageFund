import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils';

export const validate = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      throw new AppError(error.message, 400);
    }
  };
};
