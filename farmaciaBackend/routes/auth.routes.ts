import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";

export const authRoutes = Router();

authRoutes.post("/login", AuthController.login);

authRoutes.post("/register", AuthController.register);

