import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const TablesUser = sequelize.define(
  "tables_user",
  {
    tabla_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_tabla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibilidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    campos: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    creador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Relación con el modelo USER
        key: "user_id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default TablesUser;
