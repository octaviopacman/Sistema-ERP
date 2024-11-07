import {Op, where} from "sequelize";
import sequelize from "../config/db.js";
import TablesUser from "../models/tablesUser.model.js";

//NIVELES DE VISIBILIDAD
//1=OWNERS
//2=ADMINS
//3=USERS
//4=SOLO  VER

const manejarNiveles = (rol) => {
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
    /*  let foreign = "";
    let query = "";
    let campos = [];

    table_columns.map((column) => {
      if (column.autoIncrement) {
        query = `${column.name} SERIAL ${column.notNull ? "NOT NULL " : ""} 
          ${column.primaryKey ? "PRIMARY KEY " : ""}`;
        if (query) {
          campos.push(query);
        }
      } else {
        if (column.foreignkey) {
          foreign = `${column.nameForeign} ${column.foreignKeyType}`;
        }

        query = ` ${column.name} ${column.dataType} ${
          column.notNull ? " NOT NULL" : ""
        } ${column.primaryKey ? "PRIMARY KEY" : ""} ${
          column.foreignkey
            ? `${foreign}, FOREIGN KEY (${column.nameForeign}) REFERENCES ${column.tableForeign}(${column.nameForeign})`
            : ""
        }`;
        console.log(query);
        if (query) {
          campos.push(query);
        }
      }
    });

    console.log(campos);

    const queryCompleta = `CREATE TABLE IF NOT EXISTS ${table_title} (${campos.map(
      (campo, i) => campo
    )})`;
    console.log(` bbbbb dddd ${queryCompleta}`); */
    let foreign = "";
    let query = "";
    let campos = [];
    let foreignKeys = [];

    table_columns.forEach((column) => {
      let query = "";

      if (column.autoIncrement) {
        // Campo con autoincremento
        query = `${column.name} SERIAL ${column.notNull ? "NOT NULL " : ""}  ${
          column.unique ? "UNIQUE " : ""
        }${column.primaryKey ? "PRIMARY KEY" : ""}`.trim();
        if (query) campos.push(query);
      } else {
        // Campo normal
        query = `${column.name} ${column.dataType}${
          column.length ? `(${column.length})` : ""
        } ${column.unique ? "UNIQUE " : ""} ${
          column.notNull ? "NOT NULL " : ""
        } ${column.primaryKey ? "PRIMARY KEY " : ""}`.trim();
        if (query) campos.push(query);
      }

      // Si hay clave foránea, se agrega a la lista de claves foráneas
      if (column.foreignkey) {
        const foreignKey = `${column.nameForeign} ${column.foreignKeyType}, FOREIGN KEY (${column.nameForeign}) REFERENCES ${column.tableForeign}(${column.nameForeign})`;
        foreignKeys.push(foreignKey);
      }
    });

    // Combinar todos los campos y luego las claves foráneas
    const allFields = [...campos, ...foreignKeys];

    // Generar la query completa
    const queryCompleta = `CREATE TABLE IF NOT EXISTS ${table_title} (${allFields.join(
      ", "
    )})`;
    console.log(`Query Final: ${queryCompleta}`);

    const tablaNueva = await sequelize.query(queryCompleta);
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
    console.log(e);
    return res.status(500).json([e.sql]);
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

    const tablaByUser = await TablesUser.findAll({
      where: {visibilidad: {[Op.gte]: visibilidad}},
    });
    if (tablaByUser.length === 0) return res.status(400).json([]);

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
