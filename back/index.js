import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/routes/user.routes.js";
import routerTables from "./src/routes/table.routes.js";
// import routerCompany from "./src/routes/company.routes.js";
import {syncModels} from "./src/models/initModels.js"; // Importar la sincronización de los modelos

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8000",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api", router);
app.use("/api/tables", routerTables);
/* app.use('/api/company', routerCompany); */

// Sincronizar los modelos después de inicializar la aplicación
syncModels()
  .then(() => {
    console.log("Tablas sincronizadas correctamente");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });

//para que devuelva el error si es que hay alguno
app.use((error, req, res, next) => {
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(8000);
