import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/signup", authController.signUp);
authRoutes.post("/login", authController.logIn);
authRoutes.get("/me", authController.getMe);

export default authRoutes;
