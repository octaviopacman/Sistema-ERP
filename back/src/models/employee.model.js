import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Company from './companies.model.js';
import User from './user.model.js';
import Role from './role.model.js';

const Employee = sequelize.define('Employees', {
    employeeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company, // Relación con el modelo Company
        key: 'companyID',
      },
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Relación con el modelo User
        key: 'id',
      },
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // Relación con el modelo Role
        key: 'roleID',
      },
    },
  }, {
    timestamps: true,
  });
  
  export default Employee;
  