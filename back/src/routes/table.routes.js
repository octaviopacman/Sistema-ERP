import express from "express";
import {revisarCookie} from "../middlewares/autorizacion.middleware.js";
import {tableCreate} from "../controller/table.controller.js";
const routerTables = express.Router();

routerTables.post("/createTables", revisarCookie, tableCreate);

export default routerTables;
