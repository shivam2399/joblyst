import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface SavedJobAttributes {
  id: number;
  userId: number;
  companyId?: number;

  title: string;
  description?: string;
  url?: string;
  location?: string;

  employmentType?: string;
  experienceLevel?: string;

  salaryMin?: number;
  salaryMax?: number;

  source?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface SavedJobCreationAttributes
  extends Optional<SavedJobAttributes, "id"> {}

class SavedJob
  extends Model<
    SavedJobAttributes,
    SavedJobCreationAttributes
  >
  implements SavedJobAttributes
{
  declare id: number;
  declare userId: number;
  declare companyId?: number;

  declare title: string;
  declare description?: string;
  declare url?: string;
  declare location?: string;

  declare employmentType?: string;
  declare experienceLevel?: string;

  declare salaryMin?: number;
  declare salaryMax?: number;

  declare source?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SavedJob.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    companyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    url: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    employmentType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    experienceLevel: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    salaryMin: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    salaryMax: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    source: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "saved_jobs",
    timestamps: true,
  }
);

export default SavedJob;