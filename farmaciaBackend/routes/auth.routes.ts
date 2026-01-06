import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

export const authRoutes = Router();

authRoutes.get("/me", authMiddleware, AuthController.me);

authRoutes.get("/logout", authMiddleware, AuthController.logout);

authRoutes.post("/login", AuthController.login);

authRoutes.post("/register", AuthController.register);
