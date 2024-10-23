import {Op, where} from "sequelize";
import sequelize from "../config/db.js";
import TablesUser from "../models/tablesUser.model.js";

//NIVELES DE VISIBILIDAD
//1=OWNERS
//2=ADMINS
//3=USERS
//4=SOLO  VER

const manejarNiveles = (rol) => {
  console.log(rol);
  if (rol === "owner" || rol === "Owner") {
    return 1;
  } else if (rol === "admin" || rol === "Admin") {
    return 2;
  } else if (rol === "user" || rol === "User") {
    return 3;
  } else if (rol === "solo_ver" || rol === "Solo_ver") {
    return 4;
  } else {
    return false;
  }
};

export const tableCreate = async (req, res) => {
  try {
    const {table_title, table_columns, visibilidad} = req.body;
    const {user_id} = req.params;
    const tableExists = await TablesUser.findOne({
      where: {nombre_tabla: table_title},
    });
    if (tableExists) return res.status(400).json(["La tabla ya existe"]);

    const query = `CREATE TABLE IF NOT EXISTS ${table_title} (${table_columns.map(
      (column) => {
        if (column.AutoIncrement) {
          return `${column.name} SERIAL ${column.NotNull ? "NOT NULL " : ""} 
          ${column.PrimaryKey ? "PRIMARY KEY " : ""}`;
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

    const rol = manejarNiveles(visibilidad);

    const tabla = await TablesUser.create({
      nombre_tabla: table_title,
      campos: colsJSON,
      creador_id: user_id,
      visibilidad: Number(rol),
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
    const {user_id, rol} = req.params;
    const visibilidad = Number(manejarNiveles(rol));
    console.log(visibilidad);

    const tablaByUser = await TablesUser.findAll({
      where: {creador_id: user_id, visibilidad: {[Op.gte]: visibilidad}},
    });

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
    console.log(e);
    return res.status(500).json({error: e});
  }
};

export const getTablesByTableName = async (req, res) => {
  try {
    const {nombre_tabla} = req.body;

    const tablaByName = await TablesUser.findOne({
      where: {nombre_tabla},
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
