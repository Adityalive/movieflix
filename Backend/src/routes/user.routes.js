import Usermodel from "../models/user.model.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const Userrouter = express.Router();

Userrouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new Usermodel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
    const token = jwt.sign(
      { id: user._id, 
        isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
      { expiresIn: "9h" },
    );
    res.cookie("token", token, { httpOnly: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default Userrouter;
