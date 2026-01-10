import { prisma } from "../lib/client";

export class medicamentServices {
  static async register(name: string, description: string, id: number) {
    const registerMedicament = await prisma.medicament.create({
      data: {
        name: name,
        description: description,
        userId: id,
      },
    });

    if (!registerMedicament) return null;

    return registerMedicament;
  }

  static async getRegisters(userId: number) {
    const registers = await prisma.medicament.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!registers) return null;

    return registers;
  }

  static async removing(id: number) {
    const remove = await prisma.medicament.delete({
      where: { id: id },
    });

    if (!remove) return null;

    return remove;
  }
}
