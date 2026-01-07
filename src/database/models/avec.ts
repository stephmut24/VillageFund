import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

export enum AvecStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export interface AvecAttributes {
  id: number;
  name: string;
  ownerId: number;
  status: AvecStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AvecCreationAttributes = Optional<AvecAttributes, 'id' | 'status'>;

export class Avec
  extends Model<AvecAttributes, AvecCreationAttributes>
  implements AvecAttributes
{
  public id!: number;
  public name!: string;
  public ownerId!: number;
  public status!: AvecStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    Avec.belongsTo(models.Users, {
      foreignKey: 'ownerId',
      as: 'owner',
    });

    Avec.hasMany(models.AvecMember, {
      foreignKey: 'avecId',
      as: 'members',
    });

    Avec.hasMany(models.Cycle, {
      foreignKey: 'avecId',
      as: 'cycles',
    });
  }
}

export const AvecModel = (sequelize: Sequelize) => {
  Avec.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'ACTIVE', 'CLOSED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
    },
    {
      sequelize,
      tableName: 'avecs',
      modelName: 'Avec',
      timestamps: true,
    },
  );

  return Avec;
};
