import express  from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Request, Response } from "express";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hello",(req : Request,res:Response) => {
    console.log('/api/helo')
    res.json("Hello")
})


const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));