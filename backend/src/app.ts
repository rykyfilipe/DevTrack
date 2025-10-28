import express  from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import { GlobalMiddlewere } from "./middlewere/GlobalMiddlewere";
import dashboardRoutes from "./routes/DashboardRoutes";

dotenv.config();
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use(GlobalMiddlewere);
app.use("/api/users", userRoutes);
app.use("/auth",authRoutes);
app.use("/api/dashboard", dashboardRoutes);


export default app;