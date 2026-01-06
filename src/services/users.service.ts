import bcrypt from 'bcrypt';
import { Users, Role1 } from '../database/models';
import { AppError } from '../utils';


interface CreateUserDTO {
  fullName: string;
  email: string;
  password: string;
  globalRole?: Role1; 
}

export class UserService {
  /**
   * CREATE USER
   */
  static async createUser(data: CreateUserDTO) {
    
    const existingUser = await Users.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    
    const user = await Users.create({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      globalRole: Role1.User, 
    });

    return user;
  }

  /**
   * GET ALL USERS
   */
  static async getAllUsers() {
    return Users.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * GET USER BY ID
   */
  static async getUserById(id: number) {
    const user = await Users.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * DELETE USER
   */
  static async deleteUser(id: number) {
    const user = await Users.findByPk(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await user.destroy();

    return true;
  }
}
