import express from "express";
import validateSchema from "../middlewares/validaciones.middleware.js";
import {revisarCookie} from "../middlewares/autorizacion.middleware.js";
import { loginSchema, registerSchema } from "../schemas/user.schemas.js";
import {loginUser, registerUser, profileUser  } from "../controller/user.controller.js"
const router=express.Router();

router.post("/login", validateSchema(loginSchema), loginUser)
router.post("/register", validateSchema(registerSchema),registerUser)
/* router.post("/logout")
router.post("/verifyToken") */
router.post("/profile", revisarCookie, profileUser )

export default router;