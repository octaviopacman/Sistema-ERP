import sequelize from "../config/db.js";

export const tableCreate = async (req, res) => {
  const {table_title, table_columns} = req.body;
  const query = `CREATE TABLE IF NOT EXISTS ${table_title} (${table_columns.map(
    (column) => {
      return `${column.name} ${column.dataType} ${
        column.NotNull ? "NOT NULL" : ""
      } ${column.AutoIncrement ? `AUTO_INCREMENT` : ""} ${
        column.PrimaryKey ? "PRIMARY KEY" : ""
      }`;
    }
  )})`;
  const tabla = await sequelize.query(query, (err, result) => {
    if (err) throw res.status(404).json([err]);
  });
  res.status(201).json(["Table created successfully"]);
};
