import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const TablesUser = sequelize.define(
  "tables_user",
  {
    tablaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreTabla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibilidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campos: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    creadorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Relación con el modelo USER
        key: "userID",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default TablesUser;
