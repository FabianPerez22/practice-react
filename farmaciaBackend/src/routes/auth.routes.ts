import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRoutes = Router();

authRoutes.get("/me", authMiddleware, AuthController.me);

authRoutes.get("/logout", authMiddleware, AuthController.logout);

authRoutes.post("/login", AuthController.login);

authRoutes.post("/register", AuthController.register);
