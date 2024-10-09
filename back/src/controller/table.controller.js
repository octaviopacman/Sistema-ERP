import {where} from "sequelize";
import sequelize from "../config/db.js";
import TablesUser from "../models/tablesUser.model.js";

export const tableCreate = async (req, res) => {
  try {
    const {table_title, table_columns, visibilidad} = req.body;
    const {userID} = req.params;
    const tableExists = await TablesUser.findOne({
      where: {nombreTabla: table_title},
    });
    if (tableExists) return res.status(400).json(["La tabla ya existe"]);

    const query = `CREATE TABLE IF NOT EXISTS ${table_title} (${table_columns.map(
      (column) => {
        if (column.AutoIncrement) {
          return `${column.name} SERIAL ${column.NotNull ? "NOT NULL " : ""} ${
            column.PrimaryKey ? "PRIMARY KEY " : ""
          }
              `;
        } else {
          return `${column.name} ${column.dataType} ${
            column.NotNull ? "NOT NULL " : ""
          } ${column.PrimaryKey ? "PRIMARY KEY " : ""}
              `;
        }
      }
    )})`;
    const tablaNueva = await sequelize.query(query);
    if (!tablaNueva) res.status(404).json(["No se pudo crear la tabla"]);
    const colsJSON = JSON.stringify(table_columns);
    const tabla = await TablesUser.create({
      nombreTabla: table_title,
      campos: colsJSON,
      creadorID: userID,
      visibilidad,
    });
    res.status(201).json(tabla);
  } catch (e) {
    return res.status(500).json({error: e});
  }
};

export const getAllTables = async (req, res) => {
  try {
    const allTables = await TablesUser.findAll();
    for (let i = 0; i < allTables.length; i++) {
      const {campos, ...DatosTabla} = allTables[i].dataValues;
      const camposTabla = {
        campos: JSON.parse(campos),
      };
      const tabla = {...DatosTabla, ...camposTabla};
      allTables[i] = tabla;
    }
    res.status(200).json(allTables);
  } catch (e) {
    return res.status(500).json({error: e});
  }
};

export const getTablesByUserID = async (req, res) => {
  try {
    const {userID} = req.params;

    const tablaByUser = await TablesUser.findAll({where: {creadorID: userID}});
    for (let i = 0; i < tablaByUser.length; i++) {
      const {campos, ...DatosTabla} = tablaByUser[i].dataValues;
      const camposTabla = {
        campos: JSON.parse(campos),
      };
      const tabla = {...DatosTabla, ...camposTabla};
      tablaByUser[i] = tabla;
    }
    res.status(200).json(tablaByUser);
  } catch (e) {
    return res.status(500).json({error: e});
  }
};

export const getTablesByTableName = async (req, res) => {
  try {
    const {nombreTabla} = req.body;

    const tablaByName = await TablesUser.findOne({
      where: {nombreTabla},
    });

    const {campos, ...DatosTabla} = tablaByName[0].dataValues;
    const camposTabla = {
      campos: JSON.parse(campos),
    };
    const tabla = {...DatosTabla, ...camposTabla};
    res.status(200).json(tabla);
  } catch (e) {
    return res.status(500).json({error: e});
  }
};
