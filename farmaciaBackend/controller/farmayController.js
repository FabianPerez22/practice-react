import { farmacyModels } from "../models/farmacyModels.js";

export class farmacyControllers {
  static async getNames(req, res) {
    const { names } = req.params;
    const fetchingNamesData = await farmacyModels.getByName({ names });
    res.json(fetchingNamesData);
  }

  static async getAll(req, res) {
    const { name } = req.params;
    const fetchingDescriptionData = await farmacyModels.getDescription({
      name,
    });

    res.json(fetchingDescriptionData);
  }
}
