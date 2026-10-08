import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AttachmentAttributes {
  id: number;
  userId: number;
  applicationId: number;

  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface AttachmentCreationAttributes
  extends Optional<AttachmentAttributes, "id"> {}

class Attachment
  extends Model<
    AttachmentAttributes,
    AttachmentCreationAttributes
  >
  implements AttachmentAttributes
{
  declare id: number;
  declare userId: number;
  declare applicationId: number;

  declare fileName: string;
  declare fileType: string;
  declare fileSize: number;
  declare storagePath: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Attachment.init(
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

    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    fileType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    storagePath: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "attachments",
    timestamps: true,
  }
);

export default Attachment;