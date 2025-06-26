import express from "express";
import { connectDB } from "./src/configs/database.config.js";
import authRoutes from "./src/routes/auth.route.js";

await connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
