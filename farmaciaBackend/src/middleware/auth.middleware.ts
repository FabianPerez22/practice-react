import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // puedes tiparlo luego
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
