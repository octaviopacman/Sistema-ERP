import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Company = sequelize.define(
  "companies",
  {
    companyID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Company;
