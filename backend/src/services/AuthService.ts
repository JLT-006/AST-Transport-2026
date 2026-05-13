import bcrypt from 'bcrypt';
import prisma from '../config/prisma';

export class AuthService {
  async login(username: string, password_plain: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    
    if (!user || user.flag === 0) {
      throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password_plain, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid username or password');
    }

    return user;
  }

  async register(data: { username: string; password_plain: string; role: string; emp_id?: string }) {
    const existing = await prisma.user.findUnique({
      where: { username: data.username }
    });
    if (existing) throw new Error('Username already exists');

    const password_hash = await bcrypt.hash(data.password_plain, 10);
    
    return prisma.user.create({
      data: {
        username: data.username,
        password_hash,
        role: data.role,
        emp_id: data.emp_id
      }
    });
  }
}
