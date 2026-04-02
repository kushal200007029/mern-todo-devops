import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});