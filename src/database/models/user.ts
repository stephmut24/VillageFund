import {DataTypes, Model,Optional, Sequelize} from 'sequelize';

export enum Role1 {
    User = "USER",
    SUPER_ADMIN = "SUPER_ADMIN"
}

interface UserAttributes {
    id: string;
    fullName: string;
    email: string;
    password:string;
    globalRole: Role1;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    id?: string;
}

export class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id! : string;
    public fullName! : string;
    public email! : string;
    public password! : string;
    public globalRole! : Role1;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    association() {}
}

export const UserModel = (sequelize: Sequelize) =>{
    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
                type: DataTypes.ENUM("USER", "SUPER_ADMIN"),
                allowNull: false,
                defaultValue: "USER",
            }
        },
        {
            sequelize,
            modelName: "Users",
            tableName: "users",
            timestamps: true,

        }
       
    )

    return Users;
}

