import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const Userrouter = express.Router();

Userrouter.post("/register", registerUser);
Userrouter.post("/login", loginUser);

    

export default Userrouter;
