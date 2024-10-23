import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Company from "./companies.model.js";
import User from "./user.model.js";
import Role from "./role.model.js";

const Employee = sequelize.define(
  "employees",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company, // Relación con el modelo Company
        key: "company_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Relación con el modelo User
        key: "user_id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // Relación con el modelo Role
        key: "role_id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Employee;
