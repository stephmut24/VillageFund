import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users, Role1 } from '../database/models';
import { AppError } from '../utils';


interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  static async login(data: LoginDTO) {
    const user = await Users.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const payload = {
      id: user.id,
      role: user.globalRole,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.globalRole,
      },
    };
  }
}
