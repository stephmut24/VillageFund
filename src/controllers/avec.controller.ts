import { Request, Response } from 'express';
import { asyncHandler, successResponse, AppError } from '../utils';
import { AvecService } from '../services';
import { UserPayload } from '../types/auth.types';

export class AvecController {
  
  static createAvec = asyncHandler(async (req: Request, res: Response) => {
    const user: UserPayload | undefined = req.user; 

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    const { name } = req.body;

    if (!name || name.trim().length < 3) {
      throw new AppError('AVEC name must be at least 3 characters', 400);
    }

    const avec = await AvecService.createAvec({
      name: name.trim(),
      ownerId: user.id,
    });

    return successResponse(res, {
      message: 'AVEC created successfully',
      data: avec,
      statusCode: 201,
    });
  });

  // ✅ Valider AVEC (SUPER_ADMIN)
  static validateAvec = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AppError('Unauthorized', 401);
    if (req.user.globalRole !== 'SUPER_ADMIN')
      throw new AppError('Forbidden', 403);

    const avecId = (req.params.id);
    const avec = await AvecService.validateAvec(avecId);

    return successResponse(res, {
      message: 'AVEC validated successfully',
      data: avec,
    });
  });

  // ✅ Ajouter des membres à une AVEC (owner only)
  static addMembersToAvec = asyncHandler(
    async (req: Request, res: Response) => {
      const user: UserPayload | undefined = req.user;
      if (!user) throw new AppError('Unauthorized', 401);

      const avecId = (req.params.id);
      const { userIds } = req.body; // [1,2,3]

      const members = await AvecService.addMembers(avecId, userIds);

      return successResponse(res, {
        message: 'Members added successfully',
        data: members,
      });
    },
  );
}
