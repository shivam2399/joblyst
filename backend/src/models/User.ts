import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes 
   extends Optional<UserAttributes, "id"> {}
   
class User 
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare passwordHash: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date; 
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

export default User;


