import { Op, Transaction } from 'sequelize';
import { sequelize } from '../config';
import {
  Cycle,
  Avec,
  AvecMember,
  AvecStatus,
  AvecMemberRole,
} from '../database/models';
import { AppError } from '../utils';

interface CreateCycleInput {
  avecId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  sharePrice: number;
  minShares?: number;
  maxShares?: number;
  interestRate: number;
  loanMultiplier?: number;
  socialContributionAmount: number;
}

export class CycleService {

  static async createCycle(data: CreateCycleInput): Promise<Cycle> {
    const transaction: Transaction = await sequelize.transaction();

    try {
      const {
        avecId,
        userId,
        startDate,
        endDate,
        sharePrice,
        minShares,
        maxShares,
        interestRate,
        loanMultiplier,
        socialContributionAmount,
      } = data;

      //  check AVEC
      const avec = await Avec.findByPk(avecId, { transaction });
      if (!avec) {
        throw new AppError('AVEC not found', 404);
      }

      // check AVEC statut 
      if (avec.status !== AvecStatus.ACTIVE) {
        throw new AppError(
          'Cannot create a cycle for a non-active AVEC',
          400,
        );
      }

      // check PRESIDENT role
      const membership = await AvecMember.findOne({
        where: { avecId, userId },
        transaction,
      });

      if (!membership || membership.role !== AvecMemberRole.PRESIDENT) {
        throw new AppError(
          'Only the AVEC president can create a cycle',
          403,
        );
      }

      // check dates
      const now = new Date();

      if (startDate >= endDate) {
        throw new AppError(
          'startDate must be before endDate',
          400,
        );
      }

      if (startDate < now) {
        throw new AppError(
          'startDate cannot be in the past',
          400,
        );
      }

      // 5️⃣ Vérifier cycle existant (actif ou futur)
      const existingCycle = await Cycle.findOne({
        where: {
          avecId,
          endDate: {
            [Op.gte]: now,
          },
        },
        transaction,
      });

      if (existingCycle) {
        throw new AppError(
          'An active or upcoming cycle already exists for this AVEC',
          400,
        );
      }

      // 6️⃣ Créer le cycle
      const cycle = await Cycle.create(
        {
          avecId,
          startDate,
          endDate,
          sharePrice,
          minShares,
          maxShares,
          interestRate,
          loanMultiplier,
          socialContributionAmount,
        },
        { transaction },
      );

      await transaction.commit();
      return cycle;
    } catch (error) {
      await transaction.rollback();

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('Failed to create cycle', 500);
    }
  }

  static async getCyclesByAvec(avecId: string): Promise<Cycle[]> {
    const avec = await Avec.findByPk(avecId);
    if (!avec) {
      throw new AppError('AVEC not found', 404);
    }

    return Cycle.findAll({
      where: { avecId },
      order: [['startDate', 'DESC']],
    });
  }

 
  static async getActiveCycle(avecId: string): Promise<Cycle | null> {
    const now = new Date();

    return Cycle.findOne({
      where: {
        avecId,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
    });
  }
}
