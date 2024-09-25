import User from './user.model.js';
import Company from './companies.model.js';
import Employee from './employee.model.js';
import Role from './role.model.js';

// Defino las relaciones
User.hasMany(Company, { foreignKey: 'ownerID' });
Company.belongsTo(User, { foreignKey: 'ownerID' });

Company.hasMany(Employee, { foreignKey: 'companyID' });
Employee.belongsTo(Company, { foreignKey: 'companyID' });

User.hasOne(Employee, { foreignKey: 'userID' });
Employee.belongsTo(User, { foreignKey: 'userID' });

Role.hasMany(Employee, { foreignKey: 'roleID' });
Employee.belongsTo(Role, { foreignKey: 'roleID' });

// Sincroniza los modelos con la base de datos
export const syncModels = async () => {
  await User.sync({ alter: true });
  await Company.sync({ alter: true });
  await Employee.sync({ alter: true });
  await Role.sync({ alter: true });
};
