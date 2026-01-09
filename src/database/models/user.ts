import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

export enum Role1 {
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface UserAttributes {
  id: string;
  fullName: string;
  email: string;
  password: string;
  globalRole: Role1;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'isActive'
>;

export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public globalRole!: Role1;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    Users.hasMany(models.Avec, {
      foreignKey: 'ownerId',
      as: 'ownedAvecs',
    });

    Users.hasMany(models.AvecMember, {
      foreignKey: 'userId',
      as: 'avecMemberships',
    });
  }
}

export const UserModel = (sequelize: Sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      globalRole: {
        type: DataTypes.ENUM('USER', 'SUPER_ADMIN'),
        allowNull: false,
        defaultValue: 'USER',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'Users',
      timestamps: true,
    },
  );

  return Users;
};
