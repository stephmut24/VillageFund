import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  // Normaliser les erreurs non-Error
  let errorToHandle: Error | AppError;
  if (err instanceof AppError) {
    errorToHandle = err;
  } else if (err instanceof Error) {
    errorToHandle = err;
  } else {
    console.error('Non-Error thrown:', err);
    errorToHandle = new Error(typeof err === 'object' ? JSON.stringify(err) : String(err));
  }

  // Log pour debug
  console.error((errorToHandle as any).stack || errorToHandle.message);

  const status = (errorToHandle as any).status || 500;
  const message = (errorToHandle as any).message || 'Unexpected Error';

  res.status(status).json({ message, status });
};