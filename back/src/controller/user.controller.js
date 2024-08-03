import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {config} from "dotenv";
config();
const salt = Number(process.env.SALT);

export const registerUser = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const userFound = await User.findOne({where: {email}});
    if (userFound) {
      return res.status(400).json(["User already exists"]);
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const {email, password: passwordSended} = req.body;
    const userFound = await User.findOne({where: {email}});
    if (!userFound) {
      return res.status(401).json(["User not found"]);
    }
    const isMatch = bcrypt.compareSync(passwordSended, userFound.password);
    if (!isMatch) {
      return res.status(404).json(["Incorrect password"]);
    }
    const {password, ...user} = userFound._previousDataValues;

    const token = jwt.sign(user, process.env.SECRET_KEY, {});
    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      maxAge: Date.now() + 1000 * 60 * 30,
    };
    res.cookie("token", token, cookieOption);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({message: "Logged out successfully"});
};
export const profileUser = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json(["Unauthorized"]);
  }
  res.json(user);
};
/* 
export const verifyToken = async (req, res) => {
  const {token} = req.cookies;
  if (!token) return res.status(401).json(["Unauthorized"]);
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]);

    const userFound = await User.findByPk(user.username);
    if (!userFound) return res.status(401).json(["Unauthorized"]);

    return res.json(userFound);
  });
};
 */