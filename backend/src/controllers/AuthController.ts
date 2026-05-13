import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { signToken } from '../utils/jwt';

const authService = new AuthService();

export class AuthController {
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ success: false, message: 'Username and password are required' });
        return;
      }

      const user = await authService.login(username, password);
      
      const token = signToken({ user_id: user.user_id, role: user.role, emp_id: user.emp_id });
      
      const { password_hash, ...userWithoutPassword } = user;
      
      res.status(200).json({ success: true, token, user: userWithoutPassword });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, role, emp_id } = req.body;
      if (!username || !password || !role) {
        res.status(400).json({ success: false, message: 'Username, password, and role are required' });
        return;
      }

      const user = await authService.register({ username, password_plain: password, role, emp_id });
      
      const { password_hash, ...userWithoutPassword } = user;
      res.status(201).json({ success: true, user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
