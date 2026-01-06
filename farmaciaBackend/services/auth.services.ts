import { prisma } from "../prisma/client.ts";
import bcrypt from "bcrypt";

export class AuthService {
  static async validates(email: string) {
    const users = await prisma.users.findFirst({
      where: { email: email },
    });

    if (!users) return null;

    return users;
  }

  static async login(email: string, password: string) {
    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) return null;

    const tryPassword = await bcrypt.compare(password, user.password as string);

    if (!tryPassword) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async register(name: string, email: string, password: string) {
    const saltRouds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRouds);
    const register = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!register) return null;

    return register;
  }
}
