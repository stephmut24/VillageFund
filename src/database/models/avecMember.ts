import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

export enum AvecMemberRole {
  PRESIDENT = 'PRESIDENT',
  TREASURER = 'TREASURER',
  MEMBER = 'MEMBER',
}

export interface AvecMemberAttributes {
  id: number;
  userId: number;
  avecId: number;
  role: AvecMemberRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AvecMemberCreationAttributes = Optional<
  AvecMemberAttributes,
  'id' | 'role'
>;

export class AvecMember
  extends Model<AvecMemberAttributes, AvecMemberCreationAttributes>
  implements AvecMemberAttributes
{
  public id!: number;
  public userId!: number;
  public avecId!: number;
  public role!: AvecMemberRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    AvecMember.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });

    AvecMember.belongsTo(models.Avec, {
      foreignKey: 'avecId',
      as: 'avec',
    });
  }
}

export const AvecMemberModel = (sequelize: Sequelize) => {
  AvecMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avecId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('PRESIDENT', 'TREASURER', 'MEMBER'),
        allowNull: false,
        defaultValue: 'MEMBER',
      },
    },
    {
      sequelize,
      tableName: 'avec_members',
      modelName: 'AvecMember',
      timestamps: true,
    },
  );

  return AvecMember;
};
