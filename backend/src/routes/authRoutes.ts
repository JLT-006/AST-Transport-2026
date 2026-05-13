import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// In a real app, /register might be protected by authMiddleware + admin role check
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
