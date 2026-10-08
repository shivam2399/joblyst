import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProfileAttributes {
  id: number;
  userId: number;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  headline?: string;
  careerGoal?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProfileCreationAttributes
  extends Optional<ProfileAttributes, "id"> {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  declare id: number;
  declare userId: number;
  declare phone?: string;
  declare location?: string;
  declare linkedinUrl?: string;
  declare githubUrl?: string;
  declare portfolioUrl?: string;
  declare headline?: string;
  declare careerGoal?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    linkedinUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    githubUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    portfolioUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    headline: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    careerGoal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "profiles",
    timestamps: true,
  }
);

export default Profile;