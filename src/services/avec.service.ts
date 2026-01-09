import { Transaction } from 'sequelize';
import { sequelize } from '../config';
import {
  Avec,
  AvecMember,
  AvecStatus,
  AvecMemberRole,
  Users,
} from '../database/models';
import { AppError } from '../utils';
import { CreateAvecInput } from '../types';

export class AvecService {
  static async createAvec(data: CreateAvecInput): Promise<Avec> {
    const transaction: Transaction = await sequelize.transaction();

    try {
      // 1 Create an AVEC
      const avec = await Avec.create(
        {
          name: data.name,
          ownerId: data.ownerId.toString(),
          status: AvecStatus.PENDING,
        },
        { transaction },
      );

      // 2️ Add creator as a PRESIDENT
      await AvecMember.create(
        {
          userId: data.ownerId.toString(),
          avecId: avec.id,
          role: AvecMemberRole.PRESIDENT,
        },
        { transaction },
      );

      await transaction.commit();
      return avec;
    } catch {
      await transaction.rollback();
      throw new AppError('Failed to create AVEC', 500);
    }
  }

  //  Valider une AVEC (seul SUPER_ADMIN)
  static async validateAvec(avecId: string): Promise<Avec> {
    const avec = await Avec.findByPk(avecId);
    if (!avec) throw new AppError('AVEC not found', 404);

    avec.status = AvecStatus.ACTIVE;
    await avec.save();

    return avec;
  }

  //  Ajouter des membres à une AVEC
  static async addMembers(
    avecId: string,
    userIds: string[],
  ): Promise<AvecMember[]> {
    const members: AvecMember[] = [];

    const avec = await Avec.findByPk(avecId);
    if (!avec) throw new AppError('AVEC not found', 404);
    if (avec.status !== AvecStatus.ACTIVE) {
      throw new AppError('Cannot add members to a pending AVEC', 400);
    }

    const transaction: Transaction = await sequelize.transaction();

    try {
      for (const userId of userIds) {
        const user = await Users.findByPk(userId);
        if (!user) continue;

        const existing = await AvecMember.findOne({
          where: { avecId, userId },
        });
        if (existing) continue;

        const member = await AvecMember.create(
          { userId, avecId, role: AvecMemberRole.MEMBER },
          { transaction },
        );
        members.push(member);
      }

      await transaction.commit();
      return members;
    } catch {
      await transaction.rollback();
      throw new AppError('Failed to add members', 500);
    }
  }
}
