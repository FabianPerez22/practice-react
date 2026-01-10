import { Request, Response } from "express";
import { farmacyModels } from "../models/farmacyModels";
import { medicamentServices } from "../services/farmacy.services";

export class farmacyControllers {
  static async getNames(req: Request, res: Response) {
    const { names } = req.params;
    const fetchingNamesData = await farmacyModels.getByName({ names });

    return res.json(fetchingNamesData);
  }

  static async getAll(req: Request, res: Response) {
    const { name } = req.params;
    const fetchingDescriptionData = await farmacyModels.getAllData({ name });

    return res.json(fetchingDescriptionData);
  }

  static async getAllRegisters(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: `El  userId esta llegando vacios o en un formato incorrecto.`,
        });
      }

      const farmacyRegisters = await medicamentServices.getRegisters(userId);

      if (!farmacyRegisters) {
        return res.status(500).json({
          message: `Error del sistema, no se pueden traer los registros`,
        });
      }

      res.json(farmacyRegisters);
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Error de sistema, no se pudo traer los registros` });
    }
  }

  static async addMedicament(req: Request, res: Response) {
    try {
      const { name, userId } = req.body;

      if (!name || !userId) {
        return res.status(400).json({
          message: `El name o userId estan llegando vacios.`,
        });
      }

      const fetchingAllData = await farmacyModels.getAllData({ name });

      if (!fetchingAllData) {
        return res
          .status(500)
          .json({ message: "Error del sistema, no se pudo guardar" });
      }

      const data = fetchingAllData[0];

      const dataFilter = {
        name: data.termName,
        description: data.definition.text,
        userId: userId,
      };

      if (!dataFilter.name || !dataFilter.description || !dataFilter.userId) {
        return res
          .status(500)
          .json({ message: "Error del sistema, no se pudo guardar" });
      }

      const sendData = await medicamentServices.register(
        dataFilter.name,
        dataFilter.description,
        dataFilter.userId
      );

      res.json(sendData);
    } catch (e) {
      return res
        .status(500)
        .json({ message: `No se pudo guardar, hubo un error tipografico` });
    }
  }

  static async removingRegister(req: Request, res: Response) {
    try {
      const { id } = req.body;

      if (!id) return;

      const removing = medicamentServices.removing(id);

      res.json(removing);
    } catch (e) {
      res
        .status(500)
        .json({ message: `Error del sistema, no se pudo eliminar: ${e}` });
    }
  }
}
