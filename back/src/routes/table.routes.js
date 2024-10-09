import express from "express";
import {revisarCookie} from "../middlewares/autorizacion.middleware.js";
import {
  getTablesByTableName,
  getTablesByUserID,
  tableCreate,
} from "../controller/table.controller.js";
const routerTables = express.Router();

routerTables.get("/", /* revisarCookie, */ getTablesByTableName);
routerTables.get("/:userID", /* revisarCookie, */ getTablesByUserID);
routerTables.post("/createTables/:userID", /* revisarCookie, */ tableCreate);

export default routerTables;
