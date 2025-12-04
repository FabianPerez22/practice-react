import { Router } from "express";
import { farmacyControllers } from "../controller/farmayController.js";

export const routesFarmacy = Router();

routesFarmacy.get("/name/:names", farmacyControllers.getNames)

routesFarmacy.get("/description/:name", farmacyControllers.getAll);

