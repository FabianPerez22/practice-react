import { Request, Response } from "express";
import { AuthService } from "../services/auth.services.ts";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
      }

      const user = await AuthService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.json(user);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

   static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
      }

      const user = await AuthService.register(name, email, password);

      return res.json(user);
    } catch (err: any) {
      return res.status(401).json({ error: err.message});
    }
  }


}
