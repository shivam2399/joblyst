import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface CompanyAttributes {
  id: number;
  userId: number;
  name: string;
  website?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompanyCreationAttributes
  extends Optional<CompanyAttributes, "id"> {}

class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare website?: string;
  declare industry?: string;
  declare companySize?: string;
  declare location?: string;
  declare contactName?: string;
  declare contactEmail?: string;
  declare contactPhone?: string;
  declare notes?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Company.init(
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

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    website: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    industry: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    companySize: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    contactName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    contactEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    contactPhone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
  }
);

export default Company;