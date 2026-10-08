import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export enum ApplicationStatus {
    SAVED = "SAVED",
    APPLIED = "APPLIED",
    SCREENING = "SCREENING",
    INTERVIEW = "INTERVIEW",
    OFFER = "OFFER",
    REJECTED = "REJECTED",
    WITHDRAWN = "WITHDRAWNN",
    ACCEPTED = "ACCEPTED"
}

export enum ApplicationPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

interface ApplicationAttributes {
    id: number;
    userId: number;
    companyId: number;

    jobTitle: string;
    jobUrl?: string;
    applicationDate?: Date;

    status: ApplicationStatus;
    priority: ApplicationPriority;

    location?: string;
    employmentType?: string;

    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;

    source?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

interface ApplicationCreationAttributes
  extends Optional<ApplicationAttributes, "id"> {}

class Application
  extends Model<
    ApplicationAttributes,
    ApplicationCreationAttributes
  >
  implements ApplicationAttributes
{
  declare id: number;
  declare userId: number;
  declare companyId: number;

  declare jobTitle: string;
  declare jobUrl?: string;
  declare applicationDate?: Date;

  declare status: ApplicationStatus;
  declare priority: ApplicationPriority;

  declare location?: string;
  declare employmentType?: string;

  declare salaryMin?: number;
  declare salaryMax?: number;
  declare salaryCurrency?: string;

  declare source?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Application.init(
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
      allowNull: false,
    },

    jobTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    jobUrl: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },

    applicationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(ApplicationStatus)),
      allowNull: false,
      defaultValue: ApplicationStatus.APPLIED,
    },

    priority: {
      type: DataTypes.ENUM(...Object.values(ApplicationPriority)),
      allowNull: false,
      defaultValue: ApplicationPriority.MEDIUM,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    employmentType: {
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

    salaryCurrency: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "INR",
    },

    source: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "applications",
    timestamps: true,
  }
);

export default Application;