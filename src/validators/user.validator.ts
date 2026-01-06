import {z} from 'zod';
import * as Models from '../database/models';

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must contain at least 3 characters')
    .max(100),

  email: z
    .string()
    .email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

  globalRole: z
    .nativeEnum((Models as any).Role1)
    .optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;