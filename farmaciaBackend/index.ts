import express, { json } from "express";
import { routesFarmacy } from "./routes/farmacyRouter.js";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes.ts";
import cookieParser from "cookie-parser";

const app = express();
app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process?.env?.PORT ?? "4323";

app.use("/farmacia", routesFarmacy);

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`App runing on port: http://localhost:${PORT} `);
});
