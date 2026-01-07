import jwt, { SignOptions } from 'jsonwebtoken';
import { configs } from '../config';
import { UserPayload } from '../types/auth.types';
import { AppError } from '../utils'; // si tu veux gérer les erreurs proprement

// Génère un token JWT
export const generateToken = (user: UserPayload): string => {
  if (!configs.jwtSecret) {
    throw new AppError('JWT secret is not set', 500);
  }

  const payload = {
    id: user.id,
    email: user.email,
    globalRole: user.globalRole,
  };

  const expireInSecond = 24 * 60 * 60;
  const options: SignOptions = {
    expiresIn: expireInSecond,
  };

  return jwt.sign(payload, configs.jwtSecret, options);
};

// Vérifie et décode un token JWT
export const verifyToken = (token: string): UserPayload => {
  if (!configs.jwtSecret) {
    throw new AppError('JWT secret is not set', 500);
  }

  try {
    return jwt.verify(token, configs.jwtSecret) as UserPayload;
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
};
