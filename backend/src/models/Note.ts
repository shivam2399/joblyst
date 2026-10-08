import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface NoteAttributes {
  id: number;
  userId: number;
  applicationId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoteCreationAttributes
  extends Optional<NoteAttributes, "id"> {}

class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes
{
  declare id: number;
  declare userId: number;
  declare applicationId: number;
  declare content: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Note.init(
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

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "notes",
    timestamps: true,
  }
);

export default Note;