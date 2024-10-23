import User from "./user.model.js";
import Company from "./companies.model.js";
import Employee from "./employee.model.js";
import Role from "./role.model.js";
import TablesUser from "./tablesUser.model.js";

// Defino las relaciones
User.hasMany(Company, {foreignKey: "owner_id"});
Company.belongsTo(User, {foreignKey: "owner_id"});

Company.hasMany(Employee, {foreignKey: "company_id"});
Employee.belongsTo(Company, {foreignKey: "company_id"});

User.hasOne(Employee, {foreignKey: "user_id"});
Employee.belongsTo(User, {foreignKey: "user_id"});

Role.hasMany(Employee, {foreignKey: "role_id"});
Employee.belongsTo(Role, {foreignKey: "role_id"});

Role.hasMany(Employee, {foreignKey: "role_id"});
Employee.belongsTo(Role, {foreignKey: "role_id"});

User.hasMany(TablesUser, {foreignKey: "creador_id"});
TablesUser.belongsTo(User, {foreignKey: "creador_id"});

// Sincroniza los modelos con la base de datos
export const syncModels = async () => {
  await User.sync({alter: true});
  await Role.sync({alter: true});
  await Company.sync({alter: true});
  await Employee.sync({alter: true});
  await TablesUser.sync({alter: true});
};
