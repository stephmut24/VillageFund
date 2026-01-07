import { Request, Response } from 'express';
import { asyncHandler, successResponse } from '../utils';
import { UserService } from '../services';

export class UserController {
  /**
   * CREATE USER
   * POST /api/users
   */
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    });
  });

  /**
   * GET ALL USERS
   * GET /api/users
   */
  static getUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();

    return successResponse(res, {
      data: users,
    });
  });

  /**
   * GET USER BY ID
   * GET /api/users/:id
   */
  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    const user = await UserService.getUserById(userId);

    return successResponse(res, {
      data: user,
    });
  });

  /**
   * DELETE USER
   * DELETE /api/users/:id
   */
  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    await UserService.deleteUser(userId);

    return successResponse(res, {
      message: 'User deleted successfully',
    });
  });
}
