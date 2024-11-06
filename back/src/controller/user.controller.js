import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Company from "../models/companies.model.js";
import Employee from "../models/employee.model.js";
import {config} from "dotenv";
config();
const salt = Number(process.env.SALT);

export const registerUser = async (req, res, next) => {
  try {
    const {firstname, lastname, email, password, role} = req.body;
    const userFound = await User.findOne({where: {email}});
    if (userFound) {
      return res.status(400).json(["El usuario ya existe"]);
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      role,
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
    if (!userFound) return res.status(404).json(["No se encontró el usuario"]);
    const isMatch = bcrypt.compareSync(passwordSended, userFound.password);
    if (!userFound || !isMatch) {
      return res
        .status(401)
        .json(["La contraseña o el usuario son incorrectos"]);
    }
    const {password, ...user} = userFound._previousDataValues;

    const token = jwt.sign(user, process.env.SECRET_KEY, {});
    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      maxAge: Date.now() + 1000 * 60 * 30,
    };
    res.cookie("token-back", token, cookieOption);
    res.json({user, token});
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

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json(["Unauthorized"]);

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]);
    const userFound = await User.findOne({where: {email: user.email}});
    if (!userFound) return res.status(401).json(["Unauthorized"]);

    return res.json(userFound);
  });
};

export const registerCompany = async (req, res) => {
  const {companyName, ownerID} = req.body;

  try {
    const company = await Company.create({companyName, ownerID});
    res.status(201).json({message: "Company created", company});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const addEmployee = async (req, res) => {
  const {userID, companyID, roleID} = req.body;

  try {
    const employee = await Employee.create({userID, companyID, roleID});
    res.status(201).json({message: "Employee added", employee});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
