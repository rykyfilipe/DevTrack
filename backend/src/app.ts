import express  from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import { GlobalMiddlewere } from "./middlewere/GlobalMiddlewere";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(GlobalMiddlewere);
app.use("/api/users", userRoutes);
app.use("/auth",authRoutes);


export default app;