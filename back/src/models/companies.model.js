import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Company = sequelize.define('Companies', {
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
        key: 'id',
      },
    },
  }, {
    timestamps: true,
  });
  
  export default Company;
  