import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export enum ReminderStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  CANCELLED = "CANCELLED",
}

interface ReminderAttributes {
  id: number;
  userId: number;
  applicationId: number;

  title: string;
  description?: string;
  reminderAt: Date;

  status: ReminderStatus;
  sentAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

interface ReminderCreationAttributes
  extends Optional<ReminderAttributes, "id"> {}

class Reminder
  extends Model<
    ReminderAttributes,
    ReminderCreationAttributes
  >
  implements ReminderAttributes
{
  declare id: number;
  declare userId: number;
  declare applicationId: number;

  declare title: string;
  declare description?: string;
  declare reminderAt: Date;

  declare status: ReminderStatus;
  declare sentAt?: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Reminder.init(
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

    applicationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    reminderAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(ReminderStatus)),
      allowNull: false,
      defaultValue: ReminderStatus.PENDING,
    },

    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "reminders",
    timestamps: true,
  }
);

export default Reminder;