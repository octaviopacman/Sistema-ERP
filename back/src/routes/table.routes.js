import express from "express";
import {revisarCookie} from "../middlewares/autorizacion.middleware.js";
import {
  getAllTables,
  getTablesByTableName,
  getTablesByUserID,
  tableCreate,
} from "../controller/table.controller.js";
const routerTables = express.Router();

routerTables.get("/", /* revisarCookie, */ getAllTables);
routerTables.get("/getOne", /* revisarCookie, */ getTablesByTableName);
routerTables.get("/:user_id/:rol", /* revisarCookie, */ getTablesByUserID);
routerTables.post("/createTables/:user_id", /* revisarCookie, */ tableCreate);
routerTables.post("/insert/");

export default routerTables;
