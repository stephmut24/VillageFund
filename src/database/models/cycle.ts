import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

export interface CycleAttributes {
  id: number;
  avecId: number;
  startDate: Date;
  endDate: Date;
  sharePrice: number;
  minShares: number;
  maxShares: number;
  interestRate: number;
  loanMultiplier: number;
  socialContributionAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CycleCreationAttributes = Optional<
  CycleAttributes,
  'id' | 'minShares' | 'maxShares' | 'loanMultiplier'
>;

export class Cycle
  extends Model<CycleAttributes, CycleCreationAttributes>
  implements CycleAttributes
{
  public id!: number;
  public avecId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public sharePrice!: number;
  public minShares!: number;
  public maxShares!: number;
  public interestRate!: number;
  public loanMultiplier!: number;
  public socialContributionAmount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    Cycle.belongsTo(models.Avec, {
      foreignKey: 'avecId',
      as: 'avec',
    });
  }
}

export const CycleModel = (sequelize: Sequelize) => {
  Cycle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      avecId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sharePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      minShares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      maxShares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      interestRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      loanMultiplier: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      socialContributionAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'cycles',
      modelName: 'Cycle',
      timestamps: true,
    },
  );

  return Cycle;
};
