import { Router } from "express";
import { farmacyControllers } from "../controller/farmayController";

export const routesFarmacy = Router();

routesFarmacy.get("/name/:names", farmacyControllers.getNames);

routesFarmacy.get("/description/:name", farmacyControllers.getAll);

routesFarmacy.post("/registers", farmacyControllers.getAllRegisters);

routesFarmacy.post("/adding", farmacyControllers.addMedicament);

routesFarmacy.delete("/removing", farmacyControllers.removingRegister);
