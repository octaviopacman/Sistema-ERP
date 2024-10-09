import sequelize from "../config/db.js";
import {DataTypes} from "sequelize";

const Role = sequelize.define(
  "roles",
  {
    roleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false, // Los permisos se almacenan en formato JSON
    },
  },
  {
    timestamps: true,
  }
);

export default Role;
