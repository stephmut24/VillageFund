import { Request, Response } from 'express';
import { asyncHandler, successResponse } from '../utils';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);

    return successResponse(res, {
      statusCode: 200,
      message: 'Login successful',
      data: { token },
    });
  });
}
