import {Sequelize} from "sequelize";
import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();
/* const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST; */

const user = 'root';
const password = '1234';
const database = 'sistema_erp';
const host = process.env.POSTGRES_HOST;


/* const sequelize = new Sequelize({
  username: user,
  password: password,
  database: database,
  host: host,
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
}); */

const sequelize = new Sequelize( database, user, password, 
  {
    host: '127.0.0.1',   // Dirección del host
    dialect: 'mysql',               // Especifica MySQL como dialecto
    port: '3306',   // Puerto de MySQL (usualmente 3306)
    logging: false,                 // Para desactivar los logs de SQL
  }
);

export default sequelize;