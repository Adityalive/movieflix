import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
dbconnect();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);

export default app;

