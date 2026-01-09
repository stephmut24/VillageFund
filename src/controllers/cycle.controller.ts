import { Request, Response } from 'express';
import { asyncHandler, successResponse, AppError } from '../utils';
import { CycleService } from '../services';
import { UserPayload } from '../types/auth.types';

export class CycleController {
  /**
   * CREATE CYCLE
   * POST /avecs/:avecId/cycles
   * PRESIDENT only
   */
  static createCycle = asyncHandler(
    async (req: Request, res: Response) => {
      const user: UserPayload | undefined = req.user;
      if (!user) throw new AppError('Unauthorized', 401);

      const avecId = (req.params.avecId);
      if (!avecId || avecId.trim()=== "") {
        throw new AppError('Invalid AVEC id', 400);
      }

      const {
        startDate,
        endDate,
        sharePrice,
        minShares,
        maxShares,
        interestRate,
        loanMultiplier,
        socialContributionAmount,
      } = req.body;

      const cycle = await CycleService.createCycle({
        avecId,
        userId: user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        sharePrice,
        minShares,
        maxShares,
        interestRate,
        loanMultiplier,
        socialContributionAmount,
      });

      return successResponse(res, {
        statusCode: 201,
        message: 'Cycle created successfully',
        data: cycle,
      });
    },
  );

  /**
   * GET ALL CYCLES OF AN AVEC
   * GET /avecs/:avecId/cycles
   */
  static getCyclesByAvec = asyncHandler(
    async (req: Request, res: Response) => {
      const avecId = req.params.avecId;
      if (!avecId || avecId.trim()=== "") {
        throw new AppError('Invalid AVEC id', 400);
      }

      const cycles = await CycleService.getCyclesByAvec(avecId);

      return successResponse(res, {
        data: cycles,
      });
    },
  );

  /**
   * GET ACTIVE CYCLE
   * GET /avecs/:avecId/cycles/active
   */
  static getActiveCycle = asyncHandler(
    async (req: Request, res: Response) => {
      const avecId = req.params.avecId;
      if (!avecId || avecId.trim() === "") {
        throw new AppError('Invalid AVEC id', 400);
      }

      const cycle = await CycleService.getActiveCycle(avecId);

      return successResponse(res, {
        data: cycle,
      });
    },
  );
}
