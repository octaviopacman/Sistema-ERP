import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/routes/user.routes.js";
import routerTables from "./src/routes/table.routes.js";
// import routerCompany from "./src/routes/company.routes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://186.39.56.136:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api", router);
app.use("/api/tables", routerTables);
/* app.use('/api/company', routerCompany); */

//para que devuelva el error si es que hay alguno
app.use((error, req, res, next) => {
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(8000);
