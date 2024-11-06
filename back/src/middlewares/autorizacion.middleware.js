import jwt from "jsonwebtoken";
import {config} from "dotenv";
import User from "../models/user.model.js";

config();

export async function revisarCookie(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json(["Unauthorized"]);
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(401).json(["Unauthorized"]);
      const email = decoded.email;
      const response = await User.findOne({where: {email}});
      const {password, ...user} = response._previousDataValues;
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json(["Unauthorized"]);
  }
}
