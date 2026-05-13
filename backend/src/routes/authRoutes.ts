import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { loginLimiter } from '../middlewares/rateLimiter';

const router = Router();
const authController = new AuthController();

router.post('/login', loginLimiter, authController.login);
router.post('/register', authenticate, authorize('admin'), authController.register);

export default router;
