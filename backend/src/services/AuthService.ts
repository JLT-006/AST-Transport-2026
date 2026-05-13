import bcrypt from 'bcrypt';
import prisma from '../config/prisma';

const DUMMY_HASH = '$2b$10$abcdefghijklmnopqrstuuvwxyz0123456789ABCDEFGHIJKLMNOPQR';

export class AuthService {
  async login(username: string, password_plain: string) {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.flag !== 1) {
      // perform dummy bcrypt to avoid timing leak
      await bcrypt.compare(password_plain, DUMMY_HASH);
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await bcrypt.compare(password_plain, user.password_hash);
    if (!isValid) throw new Error('INVALID_CREDENTIALS');

    return user;
  }

  async register(data: { username: string; password_plain: string; role: string; emp_id?: string }) {
    const existing = await prisma.user.findUnique({ where: { username: data.username } });
    if (existing) throw new Error('USERNAME_TAKEN');

    const password_hash = await bcrypt.hash(data.password_plain, 10);

    return prisma.user.create({
      data: {
        username: data.username,
        password_hash,
        role: data.role,
        emp_id: data.emp_id,
      },
    });
  }
}
