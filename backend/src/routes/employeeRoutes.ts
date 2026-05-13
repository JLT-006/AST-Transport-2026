import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
const c = new EmployeeController();

router.use(authenticate);
router.get('/', c.findAll);
router.get('/:id', c.findById);
router.post('/', authorize('admin'), c.create);
router.put('/:id', authorize('admin'), c.update);
router.delete('/:id', authorize('admin'), c.softDelete);

export default router;
