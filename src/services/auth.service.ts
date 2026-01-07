import { Users } from '../database/models';
import bcrypt from 'bcrypt';
import { generateToken, AppError } from '../utils';
import { UserPayload } from '../types/auth.types';

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      globalRole: user.globalRole,
    };

    return generateToken(payload);
  }
}
