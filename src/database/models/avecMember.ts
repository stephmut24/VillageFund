import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

export enum AvecMemberRole {
  PRESIDENT = 'PRESIDENT',
  TREASURER = 'TREASURER',
  MEMBER = 'MEMBER',
}

export interface AvecMemberAttributes {
  id: string;
  userId: string;
  avecId: string;
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
  public id!: string;
  public userId!: string;
  public avecId!: string;
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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID, 
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      avecId: {
       type: DataTypes.UUID, 
        allowNull: false,
        references: {
          model: 'avecs',
          key: 'id',
        },
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
