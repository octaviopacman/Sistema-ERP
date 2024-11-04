import sequelize from "../config/db.js";

export const getAllValues = async (req, res) => {
  try {
    const {tablename} = req.params;

    if (tablename === "users")
      return res.status(401).json(["No puedes acceder a esta tabla"]);

    const query = `SELECT * FROM ${tablename}`;
    const response = await sequelize.query(query);

    res.status(200).json(response[response.length - 1].rows);
  } catch (error) {
    res.status(404).json([error]);
  }
};

export const insertInTable = async (req, res) => {
  try {
    const {tableName} = req.params;
    const {data} = req.body;
    const query = `INSERT INTO ${tableName} VALUES ()`;
  } catch (e) {
    res.status(500).json([e]);
  }
};
