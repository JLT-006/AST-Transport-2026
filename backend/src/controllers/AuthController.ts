import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { signToken } from '../utils/jwt';

const authService = new AuthService();

export class AuthController {
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ success: false, message: 'Username and password are required' });
        return;
      }

      const user = await authService.login(username, password);
      const token = signToken({ user_id: user.user_id, role: user.role, emp_id: user.emp_id });

      const { password_hash: _ph, ...userWithoutPassword } = user;
      res.status(200).json({ success: true, token, user: userWithoutPassword });
    } catch (error: any) {
      if (error?.message === 'INVALID_CREDENTIALS') {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
        return;
      }
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, role, emp_id } = req.body;
      if (!username || !password || !role) {
        res.status(400).json({ success: false, message: 'Username, password, and role are required' });
        return;
      }
      if (!['admin', 'user'].includes(role)) {
        res.status(400).json({ success: false, message: 'Invalid role' });
        return;
      }

      const user = await authService.register({ username, password_plain: password, role, emp_id });
      const { password_hash: _ph, ...userWithoutPassword } = user;
      res.status(201).json({ success: true, user: userWithoutPassword });
    } catch (error: any) {
      if (error?.message === 'USERNAME_TAKEN') {
        res.status(409).json({ success: false, message: 'Username already exists' });
        return;
      }
      next(error);
    }
  };
}
