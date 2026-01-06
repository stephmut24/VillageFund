import { Request, Response } from 'express';
import { asyncHandler, successResponse } from '../utils';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static login = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await AuthService.login(req.body);

      return successResponse(res, {
        message: 'Login successful',
        data: result,
      });
    }
  );
}
