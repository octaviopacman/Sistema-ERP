import express from "express";
import {revisarCookie} from "../middlewares/autorizacion.middleware.js";
import {getAllValues} from "../controller/tablePetitions.controller.js";

const routerTablePetitions = express.Router();

routerTablePetitions.get("/:tablename" /* revisarCookie, */, getAllValues);
/* routerTablePetitions.get("/getOne",  revisarCookie,  getTablesByTableName);
routerTablePetitions.get(
  "/:user_id/:rol",
   revisarCookie,  getTablesByUserID
);
routerTablePetitions.post(
  "/createTables/:user_id",
   revisarCookie,  tableCreate
);
routerTablePetitions.post("/insert/"); */

export default routerTablePetitions;
