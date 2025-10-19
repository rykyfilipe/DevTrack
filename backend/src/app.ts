import express  from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);


export default app;