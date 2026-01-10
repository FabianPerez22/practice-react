import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export class AuthController {
  static async me(req: Request, res: Response) {
    return res.json(req.user);
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("auth_token");
    res.json({ message: "Sesion cerrada" });
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;   

      if (!email || !password) {
        return res.status(400).json({
          message: "Los campos correo o contraseña no pueden estar vacio",
        });
      }

      const user = await AuthService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: "Credenciales invalidas" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json(user);
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const regex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Los campos no pueden estar vacio" });
      }

      if (!email.match(regex)) {
        return res.status(400).json({ message: "Formato de email incorrecto" });
      }

      const vals = await AuthService.validates(email);

      if (vals) {
        return res.status(400).json({ message: "Correo electronico en uso." });
      }

      const user = await AuthService.register(name, email, password);

      return res.json(user);
    } catch (err: any) {
      return res.status(500).json({ message: "Error del sistema" });
    }
  }
}
